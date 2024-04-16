<template>
  <div style="height: 100%">
    <main>
      <div class="left-side">
                <span class="title">
                  欢迎使用API测试工具
                </span>

        <div @dragover="dragover" @drop="dropopen" id="holder">
          <div style="font-size: 3em;color: green;font-weight: 900;">
            拖动项目数据文件夹到这里 <span v-if="snap">(SNAP的包仅限home目录)</span>
          </div>
          <div class="hist-list" v-if="hist">
            项目列表:
            <br><br>
            <div>
              <div v-for="(hi,index) in hist" :key="index">
                <div class="hist-li">
                              <span style="margin-right: 25px;" @click="open_obj(hi)">
                                {{ hi }}
                              </span>
                  <Icon color="#ff005a" size="30" type="md-trash" @click="shanchu(index)"/>
                </div>
              </div>
              <div>

              </div>
              <debugview> {{ hist_list }}</debugview>

            </div>
          </div>
        </div>


      </div>
    </main>
  </div>
</template>

<script>
import fs from 'fs'
import path from 'path'
import lodash from 'lodash'
import debugview from "./common/debugview";

export default {
  name: 'landing-page',
  data() {
    return {
      demo_data: {},
      hist: null,
      hist_list:{},
      w: 100,
      h: 100,
      snap: false
    }
  },
  components: {debugview},
  methods: {
    shanchu(index) {
      let hist = this.$ls.get('history')
      let hist2 = lodash.pullAt(hist, [index - 1]);
      this.$ls.set('history', hist2);
      console.log('shanchu', hist2)
      this.hist = hist2

    },
    open_obj(now) {
      console.log('open', now)
      this.$store.commit('set_now', now)
      this.$router.push('/open/')
    },

    dropopen(e) {
      e.preventDefault()
      e.stopPropagation()
      for (let f of e.dataTransfer.files) {
        //跳转
        this.now = f.path
        this.is_dir()
      }
    },
    is_dir() {
      console.log('now', this.now)
      fs.stat(this.now, (err, stats) => {
        console.log(err, stats)
        if (err) {
          throw err
        } else {
          this.$Message.success('正在打开!')
          if (stats.isDirectory()) {
            //文件夹
            this.$store.commit('set_now', this.now)
          } else {
            let pp = path.dirname(this.now)
            this.$store.commit('set_now', pp)

          }
          this.$router.push('/open/')
        }

      })

    },
    dragover(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    init() {
      this.snap = (typeof process.env.SNAP === 'string')
      // this.snap = true;
      this.demo_data.height = window.screen.availHeight

    },

  },
  created() {
    this.$store.commit('set_now', null);
    this.$store.commit('set_nowapi', null);
    let hist = this.$ls.get('history')
    this.hist = hist
    this.init();

  },
  mounted() {
    console.log(process.env);
    this.h = document.body.clientHeight;
    this.w = document.body.clientWidth;
  }
  //document.body.clientHeight
}
</script>

<style>
.hist-list {
  font-size: 2em;

}

.hist-li {
  line-height: 65px;
  height: auto;
  word-wrap: break-word;
}

#holder {
  padding: 30px;
  width: 100%;
  height: 100%;
  background-color: blanchedalmond;
}

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(
      ellipse at top left,
      rgba(255, 255, 255, 1) 40%,
      rgba(229, 229, 229, .9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}


.left-side {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: .8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
