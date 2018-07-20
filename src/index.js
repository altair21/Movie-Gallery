const _data = JSON.parse(data);
const presetWidth = [960, 750, 400, 200, 0];
$().ready(() => {
  setTimeout(() => {
    $('#info-panel').css('display', 'table');
    const triggerDistance = 200;
    const totalLen = _data.length;
    const columnHeights = []; // 记录每一列当前最后一个card的id
    const isSelected = [];  // 如果记录成 jQuery 的属性会有 bug
    let curLen = 0; // 记录当前已放置的数量
    let isEnd = false;
    let absoluteWidth = 200;  // 每一列的宽度
    let totalColumn = 1; // 列数
    let selectedIndex = -1; // 已选中的卡片的index
    let infoPanelHeight = 100;

    // const infoPanel = $('<div id="info-panel"></div>')
    //   .css('position', 'fixed').css('bottom', '-16%')
    //   .css('')

    const unselectItem = () => {
      if (selectedIndex === -1) {
        return;
      }
      const obj = $(`#card-${selectedIndex} > div`);
      isSelected[selectedIndex] = false;
      selectedIndex = -1;
      obj.children('img').animate({
        opacity: 1,
        borderRadius: 0,
      }, 300);
      $('#info-panel').stop().animate({
        bottom: `-${2.5 * infoPanelHeight}px`,
      });
    };

    const selectItem = (jObj, index, text) => {
      const delay = selectedIndex === -1 ? 0 : 300;
      unselectItem();
      selectedIndex = index;
      isSelected[index] = true;
      setTimeout(() => {
        $('#info-text').text(text);
        jObj.children('img').animate({
          opacity: 0.7,
          borderRadius: '18%',
        }, 300);
        $('#info-panel').stop().animate({
          bottom: 0,
          height: `${infoPanelHeight}px`,
        }, 300);
      }, delay);
    };

    const appendToDOM = (columnNum, id) => {
      isSelected[id] = false;
      let column = $(`#column-${columnNum}`);
      if (!column[0]) {
        $('#container').append(`<div class="column" id="column-${columnNum}"></div>`);
        column = $(`#column-${columnNum}`);
      }
      const height = (_data[id].h / _data[id].w) * absoluteWidth;
      columnHeights[columnNum] = id;
      column.append(`<div class="card" id="card-${id}"></div>`);
      const imgSrc = (_data[id].posterURL || '').replace('webp', 'jpg');
      const image = $('<img />');
      const placeholder = $('<div />')
        .css('background-color', _data[id].color || '#ffffff')
        .css('width', '100%')
        .css('height', height)
        .css('overflow', 'hidden');
      $(`#card-${id}`).append(placeholder);
      image.attr('width', '100%').attr('src', imgSrc)
        .attr('height', '100%')
        .css('opacity', 0)
        .css('display', 'block')
        .on('load', () => {
          image.animate({
            opacity: 1,
          }, 500, 'swing', () => {
            const clickHandler = () => {
              isSelected[id] = !isSelected[id];
              if (isSelected[id]) {
                selectItem(placeholder, id, `${_data[id].name}(${_data[id].year || '未知年份'})`);
              } else {
                unselectItem();
              }
            };
            image.click(clickHandler);
            image.on('tap', clickHandler);
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
      unselectItem();
      if (!isEnd && distance < triggerDistance) {
        for (let i = 0, l = totalColumn * 4; i < l; i++) {  // 每次加载四行
          appendToDOM(getShortestColumnNumber(), curLen++);
        }
      }
    };

    const init = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      infoPanelHeight = windowHeight * 0.16;
      $('#info').css('height', `${infoPanelHeight}px`);
      $('#info-panel').css('bottom', `-${2.5 * infoPanelHeight}px`);
      for (let i = 0, l = presetWidth.length; i < l; i++) {
        if (windowWidth > presetWidth[i]) {
          totalColumn = l - i;
          absoluteWidth = Math.min(1200, Math.max(windowWidth, presetWidth[i])) / totalColumn;
          break;
        }
      }
      for (let i = 0; i < totalColumn; i++) {
        columnHeights.push(0);
      }
      for (let i = 0; i < Math.min(50, _data.length); i++) {
        appendToDOM(getShortestColumnNumber(), curLen++);
      }
      $('.column').css('width', absoluteWidth);
    };

    init();

    window.addEventListener('scroll', fetchData);
  }, 400);  // fix get window width mistake issue
});
