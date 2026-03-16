const app = getApp(); // 获取全局 app 实例

Page({
  data: {
    sztuid: '',
    name: '',
    role: '',
    password: '',
    roleOptions: ['学生', '教师'], // 身份选项
  },

  // 输入事件处理函数
  inputStuid(e) {
    this.setData({ sztuid: e.detail.value });
  },

  inputName(e) {
    this.setData({ name: e.detail.value });
  },

  inputPassword(e) {
    this.setData({ password: e.detail.value });
  },

  // 选择身份
  selectRole(e) {
    const selectedRole = this.data.roleOptions[e.detail.value];
    this.setData({ role: selectedRole }); // 设置选中的身份
  },

  // 注册按钮处理逻辑
  register() {
    const { sztuid, name, role, password } = this.data;

    // 检查必填项是否填写
    console.log(sztuid,name,role,password);
    if (!sztuid || !name || !role || !password) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none',
      });
      return;
    }

    // 显示加载提示
    wx.showLoading({ title: '注册中...' });
    const endpoint = role === '学生' ? '/students' : '/teachers';

    // 发起 POST 请求
    wx.request({
      url: `${app.globalData.posturl}${endpoint}/register`, // 根据角色动态设置接口路径
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data:{
        sztuid: sztuid,
        name: name,
        password: password
      },
      success(res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            success() {
              wx.redirectTo({
                url: '/pages/login/login', // 注册成功跳转到登录页面
              });
            },
          });
        } else {
          wx.showToast({
            title: '注册失败，请重试',
            icon: 'loading',
            duration: 3000 // 提示持续时间（毫秒）
          });
          console.error('服务器错误:', res.data);
        }
      },
      fail(err) {
        wx.hideLoading();
        wx.showToast({
          title: '网络请求失败',
          icon: 'loading',
          duration: 3000 // 提示持续时间（毫秒）
        });
        console.error('网络错误:', err);
      },
    });
    console.log(sztuid,name,role,password);
  },
});
