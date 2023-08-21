let stickyDiv = document.querySelector("#sticky");

stickyDiv.addEventListener("click", (e) => {
    appendSticky(e, null);
});

// append sticky note to body on click
function appendSticky(e, elem) {
  let sticky = document.createElement("div");
  sticky.classList.add("sticky");
  if (elem) {
    sticky.innerHTML = `<div class="sticky-header">
                          <div class="minimize"><i class="fas fa-light fa-window-minimize"></i></div>
                          <div class="close"><i class="fa fa-times" aria-hidden="true"></i></div>
                        </div>
                          <div class="sticky-content">
                        </div>`;
    sticky.querySelector(".sticky-content").append(elem);
  } else {
    sticky.innerHTML = `<div class="sticky-header">
                          <div class="minimize"><i class="fas fa-light fa-window-minimize"></i></div>
                          <div class="close"><i class="fa fa-times" aria-hidden="true"></i></div>
                        </div>
                        <div class="sticky-content">
                          <textarea textarea cols="30" rows="10"></textarea>
                        </div>`;
  }

  let stickyHeader = sticky.querySelector(".sticky-header");
  let isStickyHold = false;
  let initialX;
  let initialY;

  stickyHeader.addEventListener("mousedown", function (e) {
    isStickyHold = true;
    let x = e.clientX;
    let y = e.clientY;
    initialX = x;
    initialY = y;
  });

  stickyHeader.addEventListener("mousemove", function (e) {
    if (isStickyHold) {
      let finalX = e.clientX;
      let finalY = e.clientY;
      let dx = finalX - initialX;
      let dy = finalY - initialY;

      // set top and left of sticky
      let {top, left} = sticky.getBoundingClientRect();
      sticky.style.top = top + dy + "px";
      sticky.style.left = left + dx + "px";

      initialX = finalX;
      initialY = finalY;
    }
  });

  stickyHeader.addEventListener("mouseup", function () {
    isStickyHold = false;
  });

  sticky.querySelector(".minimize").addEventListener("click", function () {
    let stickyContent = sticky.querySelector(".sticky-content");
    stickyContent.classList.contains("hide") ? stickyContent.classList.remove("hide") : stickyContent.classList.add("hide");
  });

  sticky.querySelector(".close").addEventListener("click", function () {
    sticky.remove();
  });

  document.querySelector("body").append(sticky);
}