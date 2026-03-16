// index.js
Page({
  data: {
    role: '',
    course:[]
  },
  onLoad() {
    // 获取全局数据
    const app = getApp();
    const isLoggedIn = app.globalData.isLoggedIn;

    // 检查登录状态
    if (!isLoggedIn) {
      // 未登录，跳转到登录页面
      wx.redirectTo({
        url: '/pages/login/login',
      });
      return;
    }
    this.fetchCourses();

  },
  fetchCourses() {
    const app = getApp();
    const role = app.globalData.role;
    const sztuid = app.globalData.sztuid;
    let courses = app.globalData.courses;
    if(role == 'teachers'){
      wx.request({
        url: `${app.globalData.posturl}/courses/findteacher`, // 替换为实际接口地址
        method: 'GET',
        data: {
          teacherid : sztuid
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: (res) => {
          if (res.statusCode === 200) {
            courses= res.data.data, // 将data中的课程信息存储到courses数组  
            app.globalData.courses=courses;    
            this.course = app.globalData.courses;      
            this.setData({
              course: courses, // 更新页面数据，触发页面重新渲染
            }); 
            console.log(this.course);
            console.log(app.globalData.courses);
          } else {
            console.log(res)
            wx.showToast({
              title: '获取课程失败',
              icon: 'none',
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none',
          });
        },
      });
    }else if(role =='students'){
      wx.request({
        url: `${app.globalData.posturl}/courses/findstudent`, // 替换为实际接口地址
        method: 'GET',
        data: {
          studentid : sztuid
        },
        header: {
          'Content-Type': 'application/json',
        },
        success: (res) => {
          if (res.statusCode === 200) {
            console.log(res),
            courses= res.data.data, // 将data中的课程信息存储到courses数组  
            app.globalData.courses=courses;    
            this.course = app.globalData.courses;      
            this.setData({
              course: courses, // 更新页面数据，触发页面重新渲染
            }); 
            console.log(this.course);
            console.log(app.globalData.courses);
          } else {
            console.log(res)
            wx.showToast({
              title: '获取课程失败',
              icon: 'none',
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none',
          });
        },
      });
    };
    
  },
  onCourseClick(e){
    const app = getApp();
    const role = app.globalData.role;
    const coursename = e.currentTarget.dataset.coursename;
    console.log(coursename);
    if(role == 'teachers'){
      wx.navigateTo({
        url: `/pages/teachersignin/teachersignin?coursename=${e.currentTarget.dataset.coursename}`
      });
    }else if(role == 'students'){
      wx.navigateTo({
        url: `/pages/studentsignin/studentsignin?coursename=${e.currentTarget.dataset.coursename}`
      });
    }
  },
});