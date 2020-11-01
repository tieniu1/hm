<template>
  <div class="login-container">
    <van-nav-bar
            class="app-nav-bar"
            title="登录/注册"
            left-arrow
            @click-left="$router.back()"
    />

    <!--登录表单-->
    <van-form
            ref="login-form"
            :show-error="false"
            :show-error-message="false"
            @submit="onLogin"
            @failed="onFailed"
    >
      <van-field
              maxlength="11"
              v-model="user.mobile"
              icon-prefix="toutiao"
              left-icon="shouji"
              placeholder="手机号"
              name="mobile"
              type="tel"
              :rules="formRules.mobile"

      />
      <van-field
              maxlength="6"
              v-model="user.code"
              left-icon="music-o"
              placeholder="验证码"
              name="code"
              :rules="formRules.code"
      >
        <template #button>

          <van-count-down
                  v-if="isCountDownShow"
                  :time="1000 * 10"
                  format="ss s"
                  @finish="isCountDownShow = false"
          />
          <!--禁止默认表单提交 prevent-->
          <van-button
                  v-else
                  size="small"
                  round type="primary"
                  resetValidation="mobile"
                  :loading="isSendSmsLoading"
                  @click.prevent="onSendSms"
                  class="send-btn">
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button type="info" class="login-btn" native-type="submit" block>提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import { login } from '../../api/user'
  import { Toast } from 'vant'

  export default {
    name: 'login',
    data () {
      return {
        user: {
          mobile: '15322222222',
          code: '246810'
        },
        formRules: {
          mobile: [
            { required: true, message: '请输入手机号' },
            { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
          ],
          code: [
            { required: true, message: '请输入验证码' },
            { pattern: /^\d{6}$/, message: '验证码格式错误' }
          ]
        },
        isCountDownShow: false,//倒计时
        isSendSmsLoading: false//按钮loading
      }
    },
    methods: {
      async onLogin () {
        Toast.loading({
          message: '登陆中。。。',
          forbidClick: true,
          duration: 0
        })
        try {
          let { data } = await login(this.user)
          this.$store.commit('setUser', data.data)
          Toast.success('登陆成功')
          this.$router.back()
        } catch (e) {
          Toast.fail('登陆失败')
        }

      },
      async onSendSms () {
        this.isSendSmsLoading = true
        this.isCountDownShow = true
        try {
          this.$refs['login-form'].validate('mobile')
        } catch (e) {
          this.$toast({
            message: '验证失败',
            position: 'top'
          })
          console.log(e)
        }
        this.isSendSmsLoading = false

      },
      onFailed (error) {
        if (error.errors[0]) {
          this.$toast({
            message: error.errors[0].message, // 提示消息
            position: 'top', // 防止手机键盘太高看不见提示消息
          })
        }
      }
    },
  }
</script>

<style scoped lang="scss">

  .login-btn-wrap {
    padding: 26px 16px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }

  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    border: none;

    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
</style>
