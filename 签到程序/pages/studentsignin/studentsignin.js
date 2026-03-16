// pages/studentsignin/studentsignin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursename: ''
  },
  onLoad(options) {
    // 接收传递过来的参数
    this.setData({
      coursename: options.coursename,
    });
    console.log('课程名称:', this.data.coursename);
  },
  navigateToSignin() {
    wx.navigateTo({
      url: `/pages/signin1/signin1?coursename=${this.data.coursename}`
    });
  }
})