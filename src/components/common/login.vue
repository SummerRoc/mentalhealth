<!-- 用户登录界面 -->
<template>
  <div id="login">
    <div class="top">
      <i class="iconfont icon-kaoshi"></i
      ><span class="title">心理健康信息系统</span>
    </div>
  <div class="box">
    <div class="login">
      <h2 style="margin-left: 55px">欢迎登录心灵驿站</h2>
      <div style="margin-top: 30px">
        <div class="hyper1">
          <router-link class="txt" to="">用户ID登录</router-link>
        </div>
      </div>
      <div class="login-middle">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >


        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >


          <el-form-item class="account" prop="username">
            <el-input
              ref="code"
              v-model="ruleForm.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-edit"
            ></el-input>
          </el-form-item>

          <el-form-item class="password" prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-tickets"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="footer">
        <el-button class="btn" @click="login" type="success" plain
          >登录</el-button
        >
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState } from "vuex";
export default {
  store,
  name: "login",
  data() {
    var validateId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("password");
        }
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    return {
      role: 2,
      labelPosition: "left",
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { validator: validateId, trigger: "blur" },
          { min: 5, max: 18, message: "长度在5到18个字符", trigger: "blur" },
        ],
        password: [
          { validator: validatePassword, trigger: "blur" },
          { min: 5, max: 18, message: "长度在5到18个字符", trigger: "blur" },
        ],
      },
      checked: false,
    };
  },
  methods: {
    //用户登录请求后台处理
    login() {
      console.log("登录操作执行-------");
      this.$axios({
        url: `/health/login`,
        method: "post",
        data: {
          ...this.ruleform,
        },
      }).then((res) => {
        let resData = res.data.data;
        if (resData != null) {
          switch (resData.role) {
            case 0: //管理员
              localStorage.setItem("token", res.data.data.token); //后端发的令牌
              this.$cookies.set("cname", resData.username);
              this.$cookies.set("cid", resData.userid);
              this.$cookies.set("userimage", resData.userimage);
              this.$cookies.set("role", 0);
              this.$router.push({ path: "/index" }); //跳转到首页
              this.$message({
                showClose: true,
                type: "success",
                message: "登陆成功!!",
              });

              break;
            case 1: //教师
              localStorage.setItem("token", res.data.data.token); //后端发的令牌
              this.$cookies.set("cname", resData.username);
              this.$cookies.set("cid", resData.userid);
              this.$cookies.set("userimage", resData.userimage);
              this.$cookies.set("role", 1);
              this.$router.push({ path: "/index" }); //跳转到教师用户
              this.$router.push({ path: "/index" }); //跳转到首页
              this.$message({
                showClose: true,
                type: "success",
                message: "登陆成功!!",
              });

              break;
            case 2: //学生
              localStorage.setItem("token", res.data.data.token); //后端发的令牌
              this.$cookies.set("token", resData.token);
              this.$cookies.set("cname", resData.username);
              this.$cookies.set("cid", resData.userid);
              this.$cookies.set("userimage", resData.userimage);
              this.$cookies.set("role", 2);
              this.$router.push({ path: "/student" });
              this.$message({
                showClose: true,
                type: "success",
                message: "登陆成功!!",
              });

              break;
          }
        }
        if (resData == null) {
          //错误提示
          this.$message({
            showClose: true,
            type: "error",
            message: "用户名或者密码错误",
          });
        }
      });
    },
    clickTag(key) {
      this.role = key;
    },
  },
  computed: mapState(["userInfo"]),
  mounted() {},
};
</script>

<style lang="scss" scoped>
#login {
  font-size: 14px;
  color: #000;
  background-color: #fff;
}
#login .top {
  margin-top: 1px;
  font-size: 30px;
  color: #ff962a;
  display: flex;
  overflow-y: auto;
  justify-content: center;
  padding-bottom: 80PX;
}
#login .top .icon-kaoshi {
  font-size: 80px;
}
#login .top .title {
  margin-top: 20px;
}
.box {
  position: absolute;
  width: 100%;
  height: 80%;
  background: url("../../assets/BingWallpaper2.jpg") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}

.login {
  background-color: aliceblue;
  border-radius: 25px;
  border: 2px solid #868b7a;
  padding: 20px;
  width: 300px;
  height: 420px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  opacity: 0.8;
}

.top {
  width: 100%;
  height: 50px;
}

.hyper1 {
  // display: inline;
  // margin-left: 15px;
  text-align: center;
}

.hyper2 {
  float: right;
  margin-right: 15px;
}

.txt {
  font-size: 25px;
  color: gray;
  text-decoration: none;
}

.login-middle {
  margin-top: 25px;
}

.account,
.btn {
  width: 220px;
  margin-left: 40px;
}

.password {
  margin-top: 30px;
  width: 220px;
  margin-left: 40px;
}

.footer {
  width: 100%;
  margin-top: 25px;
}

.footer-bottom {
  width: 220px;
  margin-left: 129px;
  margin-top: 15px;
}

h5 {
  display: inline-block;
  color: gray;
  margin-left: 0;
}

.TxtRegister,
.forgetpass-txt {
  text-decoration: none;
}

.TxtRegister:hover,
.forgetpass-txt:hover,
.txt:hover {
  color: rgb(26, 212, 42);
}

.checkbox {
  margin-top: 5px;
  margin-left: 40px;
}

.forgetpass {
  margin-left: 190px;
  margin-top: 15px;
}
</style>
