<template>
  <div>
    <div>
    <div id="header-chatbox">
      <!-- <HelloWorld msg="Trò chuyện"/>
      <form onSubmit="submitMessage" style="min-width: 600px">
        <div class="row form-group">
        <input class="col-10 form-control" type="text" v-model.lazy="message" placeholder="nhập dữ liệu..." />
        <button class="col btn btn-info ml-3" v-on:click="submitMessage">Gửi</button>
        </div>
      </form> -->
      <!-- {{dvtt}} -->
      <div class="row">
      <div class="col mr-5 pr-5"><line-chart :chart-data=datas></line-chart></div>
      <div class="col"><pie-chart :chart-data=dataPie></pie-chart></div>
      </div>
      <!-- @click="fillData()" -->
      <!-- <button></button> -->
       <span style="display: none">{{data}}{{label}}</span>
    </div>
    <!-- <div id="chatbox">
      <ul id="example-1" class="list-group">
        <li v-for="item in chats" v-bind:key="item.key">
          <div>
            <div v-if="item.loginName === nickname">
              <div class="float-right alert alert-info m-1 p-2">
                 <div class="font-weight-lighter" style="font-size: 12px"> {{ item.time }} </div>
               {{ item.message }}
              </div>
            </div>
            <div v-else>
              <div class="float-left alert alert-dark m-1 p-2">
                  <div class="font-weight-lighter" style="font-size: 12px">{{ item.loginName }} {{ item.time }} </div>
                {{ item.message }} 
              </div>
            </div>
          </div>
          </li>
      </ul>
    </div> -->
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import firebase from "./firebase";
import LineChart from './components/LineChart.js'
import PieChart from './components/PieChart.js'
export default {
  name: "app4",
  components: {
    HelloWorld, LineChart, PieChart
  },
  data() {
    return {
      nickname: localStorage.getItem('loginName'),
      label: [],
      data: [],
      datas: [],
      errors: [],
      dataPie: [],
      labelPie: [],
      offStatus: false,
      message: null,
      dvtt: window.MyLib
    };
  },
  created() {
    const backgroundColor = ['#003f5c','#2f4b7c','#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#5F6B6D'];
    const date = new Date();
    const today = date.getDate() + 1 < 10 ? '0' + date.getDate() + '' : date.getDate() + '';
    const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) + '' : (date.getMonth() + 1) + '';
    const year = date.getFullYear();
    const fullDate = today + month + year;
    this.dvtt = window.MyLib;
    firebase
      .database()
      .ref("statistical/"+window.MyLib+"/"+fullDate+"/label")
      .on("value", snapshot => {
        var temp = []
        snapshot.forEach(doc => {
          let item = doc.val();
          temp.push(item);
        });
        this.label = temp;
      });
      firebase
      .database()
      .ref("statistical/"+window.MyLib+"/"+fullDate+"/data")
      .on("value", snapshot => {
        var temp = []
        snapshot.forEach(doc => {
          let item = doc.val();
          temp.push(item);
        });
        this.data = temp;
      });
      this.datas = {
          labels: this.label,
            datasets: [
              {
                label: "Báo ăn hôm nay của các khoa",
                backgroundColor: '#5499C7',
                data: this.data
              }
            ]
        }
        this.labelPie = this.labels;
        this.dataPie = {
          labels: this.label,
            datasets: [
              {
                label: "Báo ăn hôm nay của các khoa",
                backgroundColor: backgroundColor,
                data: this.data
              }
            ]
        }
  },
  beforeUpdate() {
  const backgroundColor = ['#003f5c','#2f4b7c','#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#5F6B6D'];
  this.dvtt = window.MyLib;
  this.datas = {
          labels: this.label,
            datasets: [
              {
                label: "Báo ăn hôm nay của các khoa",
                backgroundColor: '#5499C7',
                data: this.data
              }
            ]
        }
        this.labelPie = this.labels;
        this.dataPie = {
          labels: this.label,
            datasets: [
              {
                label: "Báo ăn hôm nay của các khoa",
                backgroundColor: backgroundColor,
                data: this.data
              }
            ]
        }
  },
  methods: {
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
    submitMessage: function() {
      let exitData = firebase
        .database()
        .ref("messages")
        .push();
      localStorage.setItem("dvtt", localStorage.getItem("dvtt"));
      const timeInit = new Date();
      const time = timeInit.getHours() + ":"+timeInit.getMinutes()+" "+timeInit.getDate() + "/" + timeInit.getMonth() + "/" + timeInit.getFullYear()
      exitData.set({
        dvtt: localStorage.getItem("dvtt"),
        loginName: localStorage.getItem("loginName"),
        message: this.message,
        time
      });
    
    }
  }
};
</script>

