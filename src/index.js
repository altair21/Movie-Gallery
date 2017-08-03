const _data = JSON.parse(data);
const presetWidth = [960, 750, 400, 200, 0];
const testimg = 'data:image/png;base64,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';
$().ready(() => {
  const triggerDistance = 200;
  const totalLen = _data.length;
  const columnHeights = []; // 记录每一列当前最后一个card的id
  let curLen = 0; // 记录当前已放置的数量
  let isEnd = false;
  let absoluteWidth = 200;  // 每一列的宽度
  let totalColumn = 1; // 列数
  let selectedIndex = -1; // 已选中的卡片的index

  const unselectItem = (jObj) => {
    jObj.isClicked = false; // eslint-disable-line no-param-reassign
    jObj.children('img').animate({
      opacity: 1,
      borderRadius: 0,
    }, 300);
  };

  const selectItem = (jObj, index) => {
    jObj.isClicked = true;  // eslint-disable-line no-param-reassign
    unselectItem($(`#card-${selectedIndex} > div`));
    selectedIndex = index;
    jObj.children('img').animate({
      opacity: 0.7,
      borderRadius: '18%',
    }, 300);
  };

  const appendToDOM = (columnNum, id) => {
    let column = $(`#column-${columnNum}`);
    if (!column[0]) {
      $('#container').append(`<div class="column" id="column-${columnNum}"></div>`);
      column = $(`#column-${columnNum}`);
    }
    const height = (_data[id].h / _data[id].w) * absoluteWidth;
    columnHeights[columnNum] = id;
    column.append(`<div class="card" id="card-${id}"></div>`);
    const imgSrc = _data[id].posterURL;
    const image = $('<img />');
    const placeholder = $('<div />')
      .css('background-color', _data[id].color || '#ffffff')
      .css('width', '100%')
      .css('height', height)
      .css('overflow', 'hidden');
    $(`#card-${id}`).append(placeholder);
    image.attr('width', '100%').attr('src', testimg)
      .css('opacity', 0).css('display', 'block')
      .on('load', () => {
        image.animate({
          opacity: 1,
        }, 500, 'swing', () => {
          image.click(() => {
            placeholder.isClicked = !image.isClicked;
            console.log('onclick', placeholder.isClicked);
            if (placeholder.isClicked) {
              selectItem(placeholder, id);
            } else {
              unselectItem(placeholder);
            }
          });
        });
      });
    placeholder.append(image);
    if (id === totalLen) isEnd = true;
  };

  const getShortestColumnNumber = () => {
    let min = Number.MAX_VALUE;
    let ret = 0;
    for (let i = 0, l = columnHeights.length; i < l; i++) {
      const card = $(`#card-${columnHeights[i]}`);
      let height = 0;
      if (card[0]) height = card.offset().top;
      if (height < min) {
        min = height;
        ret = i;
      }
    }
    return ret;
  };

  const fetchData = () => {
    const distance = $('#spinner')[0].getBoundingClientRect().bottom - window.innerHeight;
    if (!isEnd && distance < triggerDistance) {
      for (let i = 0, l = totalColumn * 4; i < l; i++) {  // 每次加载四行
        appendToDOM(getShortestColumnNumber(), curLen++);
      }
    }
  };

  const init = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    // $('#info').css('height', windowHeight * 0.1);
    for (let i = 0, l = presetWidth.length; i < l; i++) {
      if (windowWidth > presetWidth[i]) {
        totalColumn = l - i;
        absoluteWidth = Math.min(1200, Math.max(windowWidth, presetWidth[i])) / totalColumn;
        $('.column').css('width', absoluteWidth);
        break;
      }
    }
    console.log(windowWidth, totalColumn)
    for (let i = 0; i < totalColumn; i++) {
      columnHeights.push(0);
    }
    for (let i = 0; i < Math.min(50, _data.length); i++) {
      appendToDOM(getShortestColumnNumber(), curLen++);
    }
  };

  init();

  window.addEventListener('scroll', fetchData);
});
