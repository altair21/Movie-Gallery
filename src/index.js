const _data = JSON.parse(data);
const presetWidth = [960, 750, 400, 200, 0];
$().ready(() => {
  const triggerDistance = 200;
  const totalLen = _data.length;
  const columnHeights = []; // 记录每一列当前最后一个card的id
  let curLen = 0; // 记录当前已放置的数量
  let isEnd = false;
  let absoluteWidth = 200;  // 每一列的宽度
  let totalColumn = 1; // 列数

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
    image.attr('width', '100%').attr('src', imgSrc)
      .css('opacity', 0).css('display', 'block')
      .on('load', () => {
        image.animate({
          opacity: 1,
        }, 500);
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
    for (let i = 0, l = presetWidth.length; i < l; i++) {
      if (windowWidth > presetWidth[i]) {
        totalColumn = l - i;
        absoluteWidth = Math.min(1200, Math.max(windowWidth, presetWidth[i])) / totalColumn;
        $('.column').css('width', absoluteWidth);
        break;
      }
    }
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
