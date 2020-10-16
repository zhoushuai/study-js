console.log('using vs output hello world.');

//学习javascript面向对象编程
var School = {
    classes: [],
    /**
     * 添加一个class到学校中
     * @param {*} classes 班级 
     */
    addClass: function (classes) {
        this.classes.push(classes);
    },
    /**
     * 通过班级下标移除一个班级
     * @param {*} index 班级的下标
     */
    removeClass: function (index) {
        this.classes[index] = null;
    }
}

var Class={
    /**
     * 班级名称
     */
    className:'',
    /**
     * 学生数量
     */
    studentCount:0,
}