// https://juejin.cn/post/6844903747944972295

/**
 * 高亮关键字
 * @param node 节点
 * @param pattern 匹配的正则表达式
 * @param index - 可选。本项目中特定的需求，表示第几组关键词
 * @returns exposeCount - 露出次数
 */
export function highlightKeyword(node, pattern, index) {
    var exposeCount = 0;
    if (node.nodeType === 3) {
        var matchResult = node.data.match(pattern);
        if (matchResult) {
            var highlightEl = document.createElement('span');
            highlightEl.dataset.highlight = 'yes';
            highlightEl.dataset.highlightMatch = matchResult[0];
            if (index != null) {
                highlightEl.dataset.highlightIndex = index;
            }
            var matchNode = node.splitText(matchResult.index);
            matchNode.splitText(matchResult[0].length);
            var highlightTextNode = document.createTextNode(matchNode.data);
            highlightEl.appendChild(highlightTextNode);
            matchNode.parentNode.replaceChild(highlightEl, matchNode);
            exposeCount++;
        }
    }
    // 具体条件自己加，这里是基础条件
    else if ((node.nodeType === 1) && !(/script|style/.test(node.tagName.toLowerCase()))) {
        if (node.dataset.highlight === 'yes') {
            if (index == null) {
                return;
            }
            if (node.dataset.highlightIndex === index.toString()) {
                return;
            }
        }
        let childNodes = node.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            highlightKeyword(childNodes[i], pattern, index);
        }
    }
    return exposeCount;
}

/**
 * @param {String | Array} keywords - 要高亮的关键词或关键词数组
 * @returns {Array}
 */
export function hanldeKeyword(keywords) {
    var wordMatchString = '';
    var words = [].concat(keywords);
    words.forEach(item => {
        let transformString = item.replace(/[.[*?+^$|()/]|\]|\\/g, '\\$&');
        wordMatchString += `|(${transformString})`;
    });
    wordMatchString = wordMatchString.substring(1);
    // 用于再次高亮与关闭的关键字作为一个整体的匹配正则
    var wholePattern = new RegExp(`^${wordMatchString}$`, 'i');
    // 用于第一次高亮的关键字匹配正则
    var pattern = new RegExp(wordMatchString, 'i');
    return [pattern, wholePattern];
}
