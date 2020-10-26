class SearchList {
    constructor() {
        this.showList = [] // 展示的列表数据
        this.list = [] // 全部的列表数据
    }

    changeData(options) {
        options.forEach(item => {
            const {
                'im:name': { label: name },
                'im:artist': { label: artist },
                category: {
                    attributes: { label: attr }
                },
                summary: { label: su }
            } = item
            item.sear = [name, attr, artist, su]
        })
        return options
    }

    // 执行搜索
    search(key, arr) {
        let arrTrueList = [], // 匹配的数据
            arrFalseList = [] // 不匹配数据
        arr.forEach(item => {
            // 判断输入值key 是否存在对象数组上面
            if (item.sear.some(it => it.indexOf(key) !== -1)) {
                item.showStatus = true
                arrTrueList.push(item)
            } else {
                item.showStatus = false
                arrFalseList.push(item)
            }
        })
        this.showList = arrTrueList
        this.list = arrTrueList.concat(arrFalseList)
        return this
    }

    // 获取 展示的列表
    getShowList() {
        return this.showList
    }

    // 获取 全部的列表
    getList() {
        return this.list
    }
}

export default SearchList
