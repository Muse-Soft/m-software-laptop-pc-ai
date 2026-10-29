/* Render thẻ sản phẩm dùng chung + lọc/sắp xếp/phân trang trang danh mục. */
function fmt(n){return n.toLocaleString("vi-VN")+" ₫";}
function detailPrefix(){var ph=window.location.pathname;return (ph.indexOf("/danh-muc/")>=0||ph.indexOf("/san-pham/")>=0)?"../":"";}
function catName(slug){var c=(window.CATEGORIES||[]).filter(function(x){return x.slug===slug;})[0];return c?c.name:slug;}
function cardHTML(p){
  var badges="";
  if(p.npu) badges+='<span class="badge ai">AI</span>';
  if(p.isNew) badges+='<span class="badge new">Mới</span>';
  return '<article class="card"><div class="card-img"><div class="badges">'+badges+'</div><span>'+(window.CATEGORY_ICON[p.category]||"📦")+'</span></div>'
  +'<div class="card-body"><div class="card-name">'+p.name+'</div><div class="card-spec">'+p.spec+'</div>'
  +'<div class="price">'+fmt(p.price)+(p.oldPrice?'<span class="old">'+fmt(p.oldPrice)+'</span>':"")+'</div>'
  +'<div class="'+(p.stock?"in":"out")+'">'+(p.stock?"● Còn hàng":"○ Hết hàng")+'</div>'
  +'<div><a class="btn secondary" href="'+detailPrefix()+'san-pham/chi-tiet.html?id='+p.id+'">Xem chi tiết</a> '
  +(p.stock?"":'<button class="btn secondary" disabled>Hết hàng</button>')+'</div></div></article>';
}
function applySearch(list){
  var q=(document.getElementById("search-input")||{}).value||"";
  q=q.trim().toLowerCase();
  if(!q) return list;
  return list.filter(function(p){return (p.name+" "+p.brand+" "+p.spec+" "+catName(p.category)).toLowerCase().indexOf(q)>=0;});
}
/* Trang chủ */
(function(){
  var el=document.getElementById("featured-grid"); if(!el) return;
  function render(){
    var list=applySearch(window.PRODUCTS.filter(function(p){return p.featured;}).slice(0,8));
    el.innerHTML=list.length?list.map(cardHTML).join(""):'<div class="empty">Không có sản phẩm phù hợp.</div>';
    var tiles=document.querySelectorAll(".cat-tile .count");
    window.CATEGORIES.forEach(function(c,i){
      var n=window.PRODUCTS.filter(function(p){return p.category===c.slug;}).length;
      if(tiles[i]) tiles[i].textContent=n+" sản phẩm";
    });
  }
  document.getElementById("search-input").addEventListener("input",render); render();
})();
/* Trang danh mục */
(function(){
  var grid=document.getElementById("catalog-grid"); if(!grid) return;
  var slug=grid.dataset.category, PAGE=6, shown=PAGE;
  var qParam=new URLSearchParams(window.location.search).get("q");
  if(qParam){document.getElementById("search-input").value=qParam;document.querySelectorAll(".f-cat").forEach(function(x){x.checked=true;});}
  var brands=[]; window.PRODUCTS.forEach(function(p){if(brands.indexOf(p.brand)<0) brands.push(p.brand);});
  document.getElementById("brand-filters").innerHTML=brands.map(function(b){
    return '<label><input type="checkbox" class="f-brand" value="'+b+'"> '+b+'</label>';}).join("");
  function priceMatch(p,vals){
    if(!vals.length) return true;
    return vals.some(function(v){
      if(v==="lt15") return p.price<15000000;
      if(v==="15-30") return p.price>=15000000&&p.price<30000000;
      if(v==="30-50") return p.price>=30000000&&p.price<50000000;
      return p.price>=50000000;
    });
  }
  function ramMatch(p,vals){
    if(!vals.length) return true;
    if(p.ram==null) return false;
    return vals.some(function(v){
      if(v==="16") return p.ram===16;
      if(v==="32") return p.ram===32;
      return p.ram>=64;
    });
  }
  function checked(cls){return Array.prototype.slice.call(document.querySelectorAll(cls+":checked")).map(function(x){return x.value;});}
  function filtered(){
    var cats=checked(".f-cat"), brs=checked(".f-brand"), prs=checked(".f-price"), rams=checked(".f-ram");
    var npu=document.getElementById("f-npu").checked, instock=document.getElementById("f-instock").checked;
    var list=window.PRODUCTS.filter(function(p){
      return cats.indexOf(p.category)>=0 && (brs.length===0||brs.indexOf(p.brand)>=0)
        && priceMatch(p,prs) && ramMatch(p,rams) && (!npu||p.npu) && (!instock||p.stock);
    });
    list=applySearch(list);
    var sort=document.getElementById("sort").value;
    if(sort==="price-asc") list.sort(function(a,b){return a.price-b.price;});
    else if(sort==="price-desc") list.sort(function(a,b){return b.price-a.price;});
    else if(sort==="name") list.sort(function(a,b){return a.name.localeCompare(b.name,"vi");});
    else list.sort(function(a,b){return (b.isNew-a.isNew)||(b.id-a.id);});
    return list;
  }
  function render(reset){
    if(reset) shown=PAGE;
    var list=filtered();
    document.getElementById("shown-count").textContent="Đang hiển thị "+Math.min(shown,list.length)+" / "+list.length+" sản phẩm";
    document.getElementById("clear-filters").style.display=
      (checked(".f-cat").length!==1||checked(".f-cat")[0]!==slug||checked(".f-brand").length||checked(".f-price").length||checked(".f-ram").length||document.getElementById("f-npu").checked||document.getElementById("f-instock").checked)?"inline-block":"none";
    if(!list.length){
      grid.innerHTML=""; document.getElementById("empty-state").style.display="block";
      document.getElementById("load-more").style.display="none"; document.getElementById("all-done").style.display="none"; return;
    }
    document.getElementById("empty-state").style.display="none";
    grid.innerHTML=list.slice(0,shown).map(cardHTML).join("");
    document.getElementById("load-more").style.display=shown<list.length?"inline-block":"none";
    document.getElementById("all-done").style.display=shown>=list.length?"block":"none";
  }
  document.querySelectorAll(".filters input, #sort").forEach(function(x){x.addEventListener("change",function(){render(true);});});
  document.getElementById("search-input").addEventListener("input",function(){render(true);});
  document.getElementById("load-more").addEventListener("click",function(){shown+=PAGE; render(false);});
  document.getElementById("clear-filters").addEventListener("click",function(){
    document.querySelectorAll(".f-brand,.f-price,.f-ram").forEach(function(x){x.checked=false;});
    document.querySelectorAll(".f-cat").forEach(function(x){x.checked=(x.value===slug);});
    document.getElementById("f-npu").checked=false; document.getElementById("f-instock").checked=false; render(true);
  });
  document.getElementById("empty-clear").addEventListener("click",function(){document.getElementById("clear-filters").click();});
  document.getElementById("filter-btn").addEventListener("click",function(){document.querySelector(".filters").classList.toggle("open");});
  render(true);
})();

/* Trang chi tiet san pham */
(function(){
  var box=document.getElementById("detail"); if(!box) return;
  var id=parseInt(new URLSearchParams(window.location.search).get("id"),10);
  var p=(window.PRODUCTS||[]).filter(function(x){return x.id===id;})[0];
  var search=document.getElementById("search-input");
  if(search) search.addEventListener("keydown",function(e){if(e.key==="Enter"&&search.value.trim()) window.location.href="../danh-muc/laptop-ai.html?q="+encodeURIComponent(search.value.trim());});
  if(!p){box.style.display="none";document.getElementById("not-found").style.display="block";document.title="Không tìm thấy sản phẩm — Shop Laptop & PC AI";return;}
  document.title=p.name+" — Shop Laptop & PC AI";
  var crumb=document.getElementById("crumb-cat");
  if(crumb) crumb.innerHTML='› <a href="../danh-muc/'+p.category+'.html">'+catName(p.category)+'</a> › '+p.name;
  var badges=""; if(p.npu) badges+='<span class="badge ai">AI</span>'; if(p.isNew) badges+='<span class="badge new">Mới</span>';
  var specRows=p.spec.split("·").map(function(x){return x.trim();}).filter(Boolean);
  var rows=[["Thương hiệu",p.brand],["Danh mục",catName(p.category)],["RAM",p.ram?p.ram+"GB":"—"],["NPU / AI trên máy",p.npu?"Có":"Không"],["Bảo hành","24 tháng"]].map(function(r){return "<tr><th>"+r[0]+"</th><td>"+r[1]+"</td></tr>";}).join("");
  box.innerHTML='<div class="detail-layout"><div class="detail-img"><div class="badges">'+badges+'</div><span>'+(window.CATEGORY_ICON[p.category]||"📦")+'</span></div>'
    +'<div><h2>'+p.name+'</h2><div class="price">'+fmt(p.price)+(p.oldPrice?'<span class="old">'+fmt(p.oldPrice)+'</span>':"")+'</div>'
    +'<div class="'+(p.stock?"in":"out")+'">'+(p.stock?"● Còn hàng":"○ Hết hàng")+'</div>'
    +'<p class="card-spec">'+p.spec+'</p>'
    +'<div><button class="btn" id="order-btn" '+(p.stock?"":'disabled')+'>'+(p.stock?"Liên hệ đặt hàng":"Hết hàng")+'</button> <a class="btn secondary" href="../danh-muc/'+p.category+'.html">Quay lại danh mục</a></div>'
    +'<p id="order-note" class="order-note" style="display:none"></p>'
    +'<table class="spec-table"><caption>Thông số kỹ thuật</caption>'+specRows.map(function(x){return "<tr><td colspan=\"2\">"+x+"</td></tr>";}).join("")+rows+'</table></div></div>';
  /* Nút "Liên hệ đặt hàng" trước đây là button thuần, không có handler nên bấm không có tác dụng.
     Hành vi mới: hiện ghi chú ngay tại chỗ + cuộn tới khối liên hệ ở footer và làm nổi bật nó.
     TUYỆT ĐỐI không bịa số điện thoại/email: footer hiện vẫn ghi "(chưa cập nhật)". */
  var orderBtn=document.getElementById("order-btn");
  if(orderBtn) orderBtn.addEventListener("click",function(){
    var note=document.getElementById("order-note");
    if(note){note.textContent="Thông tin liên hệ hiện vẫn (chưa cập nhật) — xem khối liên hệ cuối trang.";note.style.display="block";}
    var f=document.querySelector("footer");
    if(f){f.scrollIntoView({behavior:"smooth"});f.classList.add("contact-flash");setTimeout(function(){f.classList.remove("contact-flash");},3000);}
  });
  var rel=window.PRODUCTS.filter(function(x){return x.category===p.category&&x.id!==p.id;}).slice(0,4);
  if(rel.length){document.getElementById("related-wrap").style.display="block";document.getElementById("related-grid").innerHTML=rel.map(cardHTML).join("");}
})();
document.getElementById("menu-btn").addEventListener("click",function(){document.querySelector("nav.main").classList.toggle("open");});
