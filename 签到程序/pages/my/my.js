// pages/my/my.js
const app=getApp();
Page({
  data: {
    sztuid : '',
    name  : '',
    role : '',
    password : ''
  },
  login: function() {
    // 检查是否已登录（这里以 sztuid 是否为空为判断标准）
    if (app.globalData.sztuid && app.globalData.sztuid !== '') {
      // 已登录，跳转到 mymessage 页面
      wx.navigateTo({
        url: '/pages/my/my',
      });
      wx.showToast({
        title: '已登录',
        icon: 'none',
      });
      console.log("已登录，跳转到我的消息页面");
    } else {
      // 未登录，跳转到 login 页面
      wx.navigateTo({
        url: '/pages/login/login',
      });
      console.log("未登录，跳转到登录页面");
    }
  },
  exit: function() {
    app.globalData.courses = [];
    app.globalData.isLoggedIn = false;
    app.globalData.sztuid = '';
    app.globalData.name = '';
    app.globalData.role = '';
    app.globalData.password = '';
  
    this.setData({
      sztuid: '',
      name: '',
      role: '',
    });
  
    wx.showToast({
      title: '已退出',
      icon: 'success',
    });
    if (!app.globalData.isLoggedIn) {
      // 未登录，跳转到登录页面
      wx.redirectTo({
        url: '/pages/login/login',
      });
      return;
    }
    console.log("用户已退出，数据已清空");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      role : app.globalData.role,
      name: app.globalData.name,
      sztuid : app.globalData.sztuid
    });
    this.sztuid = app.globalData.sztuid;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (this.data.shouldRefresh) {
      console.log("刷新页面数据...");
      this.refreshData();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  /**
   * 页面上拉触底事件的处理函数
   */


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})