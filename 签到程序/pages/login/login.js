const app = getApp(); // 获取全局 app 实例

Page({
  data: {
    sztuid: '',
    password: '',
    role: '',
    selectrole:'',
    roleOptions: ['学生', '教师']
  },

  // 输入事件处理函数
  inputStuid(e) {
    this.sztuid = e.detail.value;
  },

  inputPassword(e) {
    this.password = e.detail.value;
  },
  // 选择身份
  selectRole(e) {
    const selectedRole = this.data.roleOptions[e.detail.value];
    if(selectedRole =='学生'){
      this.role = 'students';
    }
    else if(selectedRole =='教师'){
      this.role ='teachers';
    }
    this.setData({ selectrole: selectedRole })
  },

  // 登录按钮处理逻辑
  register: function (event) {
    const url = "/pages/register/register";
    if (url) {
      wx.navigateTo({
        url: url,
      });
    } else {
      console.error('未指定跳转页面的 URL');
    }
  },

  login() {
    if (!this.sztuid || !this.password || !this.role) {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none',
      });
      return;
    }

    wx.request({
      url: `${app.globalData.posturl}/${this.role}/find`, // 替换为你的服务器地址
      method: 'GET',
      data: {
        sztuid: this.sztuid,
        password: this.password,
      },
      header: {
        'Content-Type': 'application/json',
      },
      success : (res) => {
        if (res.data.success) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
          });
          // 保存用户信息到全局变量
          console.log(res.data.data);
          app.globalData.sztuid = res.data.data.sztuid;
          app.globalData.name = res.data.data.name;
          app.globalData.role = this.role;
          app.globalData.password = res.data.data.password;
          app.globalData.isLoggedIn = true;
          console.log(app.globalData.sztuid);
          console.log(app.globalData.name);
          console.log(app.globalData.role);
          console.log(app.globalData.isLoggedIn);
          // 跳转到首页
          wx.switchTab({
            url: '/pages/my/my?refresh=true',
          });
        } else {
          wx.showToast({
            title: res.data.error || '登录失败',
            icon: 'none',
          });
        }
      },
      fail: (err) =>{
        console.error('请求失败:', err);
        wx.showToast({
          title: '服务器错误，请稍后再试',
          icon: 'none',
        });
      },
    });
  },
});
