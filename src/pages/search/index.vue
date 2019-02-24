<template>
  <div class="container">
  <div class="search">
    <input class='search-input' focus :placeholder="subtitle" @change="handleSearch" />
  </div>
  <div class="list">
    <div class="tips" v-if="loading">
      <div>
        <img class='tips-img' src="/static/images/loading.gif" mode="aspectFill"/>
        <span>刷新中...</span>
      </div>
    </div>
    <navigator v-for="item in list"  :url="'../item/main?id='+item.id" :key="item.id">
      <product :item="item"></product>
    </navigator>
    <div class="tips" v-if="list.length>0">
      <div v-if="hasMore">
        <img class='tips-img' src="/static/images/loading.gif" mode="aspectFill"/>
        <span class="span">玩了命的加载中...</span>
      </div>
      <div v-else>
        <span>没有更多内容了</span>
      </div>
    </div>
  </div>
</div>
</template>
 
<script>
import douban from '../../utils/douban'
import product from '../../components/product'
export default {
    data(){
        return{
            page: 1,
            size: 20,
            subtitle: '请在此输入搜索内容',
            list: [],
            search: '恐怖',
            loading: false,
            hasMore: false
        }
    },
    
    methods:{
        loadList(){
            this.subtitle = '加载中...';
            this.hasMore = true;
            this.loading = true;
            let start = (this.page - 1) * this.size;//计算开始条数
            this.page = this.page + 1;
            // console.log('https://douban.uieee.com/v2/movie/search?q=' + this.data.search + '&start=' + start + '&count=' + this.data.size);
            douban({
            url: '/v2/movie/search',
            data: {
                tag: this.search,
                start: start,
                count: this.size
            }
            }).then(
            res => {
                this.subtitle = res.data.title;
                this.hasMore = false;
                this.loading = false;
                if (!res.data.subjects.length) {
                return;
                }

                let result = [];
                res.data.subjects.map((item) => {
                result.push({
                    image: item.images.small,
                    id: item.id,
                    title: item.title,
                    average: item.rating.average,
                    original_title: item.original_title,
                    year: item.year,
                    directors: (item.directors.length && item.directors[0].name) || '-'
                })
                });
                this.list = this.list.concat(result)
                
                mpvue.stopPullDownRefresh(); //停止下拉刷新UI
            }
            )
        },
 
  handleSearch(e) {
    if (!e.target.value) return
    this.list = [];
    this.page = 1;

    this.subtitle = '加载中...';
    this.hasMore = true;
    this.loading = true;
    this.search = e.target.value;
    this.loadList()
  },

    },

     onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    this.list = [];
    this.page = 1;
    this.loadList();
      // app.wechat.original.stopPullDownRefresh(); //停止下拉刷新UI
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
    this.loadList(); //加载更多
  },


    components:{
        product
    }
}
</script>


<style>
.container {
  display: flex;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;
}

.search {
  display: flex;
  justify-content: center;
  border-bottom: 1rpx solid #ccc;
}

.search .search-input {
  padding: 20rpx 40rpx;
  color: #999;
  font-size: 38rpx;
  span-align: center;
}

.list {
  display: flex;
  flex: 1;
  flex-direction: column;
}


.list .tips {
  font-size: 28rpx;
  span-align: center;
  padding: 50rpx;
  color: #ccc;
}

.list .tips .tips-img,
.list .tips .span {
  vertical-align: middle;
}

.list .tips .tips-img {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}

</style>
