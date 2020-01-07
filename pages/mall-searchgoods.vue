<template>
    <div class="container mall-searchgoods">
        <!-- 头部 -->
        <Toper :toperParams="toperParams" />

        <!--        顶部信息-->
        <div class="top-info-searchbar-bg">
            <div class="wrap">
                <div class="top-info-searchbar-content-bg">
                    <div class="top-info-img-bg">
                        <img src="../static/shop/cart-info-text.png" class="top-info-img" alt="商城品质图片" />
                    </div>
                    <div class="top-searchbar-bg">
                        <div class="searchbar-input-bg">
                            <input type="input" v-model="searchGoodsName" placeholder="麦咭智能" @keyup.enter="searchGoodsResultToName(false, true, '1', '0')" />
                        </div>
                        <div class="searchbar-searchbtn-bg" @click="searchGoodsResultToName(false, true, '1', '0')">
                            <span class="iconfont icon-search"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--        顶部商品筛选排序-->
        <div class="top-goods-sort-bg">
            <div class="wrap">
                <div class="top-goods-sort-content-bg">
                    <nuxt-link target="_blank" to="" class="goods-sort-bg" @click.native="searchGoodsSort(0)">
                        <p :class="searchSortType === 0 ? 'active' : ''">
                            综合
                        </p>
                    </nuxt-link>
                    <nuxt-link target="_blank" to="" class="goods-sort-bg" @click.native="searchGoodsSort(2)">
                        <p :class="searchSortType === 2 ? 'active' : ''">
                            销量
                        </p>
                    </nuxt-link>
                    <nuxt-link target="_blank" to="" class="goods-sort-bg" @click.native="searchGoodsSort(34)">
                        <p :class="searchSortType === 3 || searchSortType === 4 ? 'active' : ''">
                            价格
                            <img src="../static/shop/mall-search-price-high.png" class="search-price-highlow-img" alt="价格高低排序" v-if="searchSortType === 3" />
                            <img src="../static/shop/mall-search-price-low.png" class="search-price-highlow-img" alt="价格高低排序" v-else-if="searchSortType === 4" />
                            <img src="../static/shop/mall-search-price-default.png" class="search-price-highlow-img" alt="价格高低排序" v-else />
                        </p>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <!--        搜索商品结果-->
        <div class="search-goods-result-bg">
            <div class="wrap">
                <div class="search-goods-result-content-bg row" v-if="searchGoodsList && searchGoodsList.length > 0">
                    <div class="search-goods-content-item-bg col col-pc-3 col-pad-12 col-mobile-12" v-for="(item, index) in searchGoodsList" :key="index">
                        <nuxt-link target="_blank" :to="'/goods-detail/' + item.mallGoodsId" class="search-goods-content-bg">
                            <div
                                class="goods-logo-img-bg"
                                :style="{
                                    backgroundImage: 'url(' + item.mallGoodsEspImg + ')'
                                }"
                            ></div>
                            <div class="goods-title-price-bg">
                                <p class="goods-title">
                                    {{ item.mallGoodsName }}
                                </p>
                                <div class="goods-price-bg">
                                    <p class="goods-current-price">￥{{ item.perPrice }}</p>
                                    <p class="goods-orgin-price">￥{{ item.oriPrice }}</p>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>

                <div class="search-goods-result-nodata-bg" v-else-if="searchGoodsList && searchGoodsList.length === 0">
                    <img src="../static/list-holder.jpg" class="search-goods-result-nodata-img" alt="无数据图片" />
                </div>
            </div>
        </div>

        <!-- 切换页数-->
        <div class="bottom-search-pagenum-bg">
            <div class="wrap">
                <div class="bottom-search-pagenum-content-bg">
                    <div class="search-pagenum-number-bg" v-if="searchShowPreNextPage">
                        <nuxt-link target="_blank" to="" class="page-number" :class="searchShowCurrentPage !== 1 ? 'active' : ''" @click.native="searchGoodsPreNexPage(1, null, searchShowCurrentPage - 1, 0)">&lt;</nuxt-link>
                        <nuxt-link target="_blank" to="" class="page-number" v-for="(item, index) in searchShowPageCountList" :key="index" :class="searchShowCurrentPage === item.pageNum ? 'active' : ''" @click.native="searchGoodsPreNexPage(2, item, item.pageNum, index)">
                            {{ item.pagePoint ? '...' : item.pageNum }}
                        </nuxt-link>
                        <nuxt-link target="_blank" to="" class="page-number" :class="searchShowCurrentPage !== searchTotalPageCountList.length ? 'active' : ''" @click.native="searchGoodsPreNexPage(3, null, searchShowCurrentPage + 1, 0)">&gt;</nuxt-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部 -->
        <Footer />
    </div>
</template>
<script>
import Toper from '~/components/Toper.vue';
import Footer from '~/components/Footer.vue';
import Slide from '~/components/Slide.vue';
import Subject from '~/components/Subject.vue';
import axios from 'axios';

export default {
    data() {
        return {
            toperParams: {
                backgroundColor: 'white',
                category: 'maiji-shop'
            },
            searchGoodsName: '',
            searchSortType: 0,
            searchShowMaxPageCount: 8,
            searchShowPreNextPage: false,
            searchShowCurrentPage: 1,
            searchShowPageCountList: [],
            searchTotalPageCountList: [],
            searchGoodsList: null,
            smallCategory: 0
        };
    },
    computed: {},
    created() {
        this.searchGoodsName = this.$route.query.name;
        this.smallCategory = this.$route.query.smallCategory;
        this.searchGoodsResultToName(true, true, '1', '0');
    },
    beforeMount() {},
    activated() {},
    mounted() {},
    components: {
        Toper,
        Slide,
        Subject,
        Footer
    },
    watch: {
        searchGoodsName: function(newVal, oldValue) {
            if (oldValue != '' && oldValue != this.searchGoodsName) {
                this.smallCategory = 0;
            }
        }
    },
    methods: {
        async pageInitRequestData(clickSearch, pageNum, sort) {
            let resultData = await axios({
                url: this.$domain + '/mer/mall/getMallGlobalSearch',
                method: 'post',
                data: {
                    sort: sort,
                    //name: this.searchGoodsName,
                    name: this.smallCategory != 0 && this.smallCategory != undefined ? '' : this.searchGoodsName,
                    pageNum: pageNum,
                    pageSize: '20',
                    smallCategory: this.smallCategory != null && this.smallCategory != 0 ? this.smallCategory : null
                }
            });
            if (resultData && resultData.data && resultData.data.body && resultData.data.body.basePageRspDTO && resultData.data.body.basePageRspDTO.list && resultData.data.body.basePageRspDTO.list.length > 0) {
                let dtoData = resultData.data.body.basePageRspDTO;
                this.searchGoodsList = dtoData.list;

                if (this.searchTotalPageCountList.length === 0 || clickSearch) {
                    this.searchShowPageCountList.length = 0;
                    this.searchTotalPageCountList.length = 0;
                    this.searchShowPreNextPage = false;
                    this.searchShowCurrentPage = 1;

                    let totalPageCount = dtoData.pageCount;
                    if (totalPageCount > 1) {
                        for (let i = 0; i < totalPageCount; i++) {
                            let pageNumVal = i + 1;
                            let pagePointVal = totalPageCount > this.searchShowMaxPageCount && pageNumVal === this.searchShowMaxPageCount - 1;

                            let pageData = {
                                pageNum: pageNumVal,
                                pagePoint: pagePointVal
                            };
                            if (pageNumVal < this.searchShowMaxPageCount) {
                                this.searchShowPageCountList.push(pageData);
                            } else if (pageNumVal === totalPageCount) {
                                this.searchShowPageCountList.push(pageData);
                            }
                            this.searchTotalPageCountList.push(pageData);
                        }
                        this.searchShowPreNextPage = true;
                    }
                }
            } else {
                if (this.searchTotalPageCountList.length === 0 || clickSearch) {
                    this.searchGoodsList = [];
                    this.searchShowPageCountList.length = 0;
                    this.searchTotalPageCountList.length = 0;
                    this.searchShowPreNextPage = false;
                    this.searchShowCurrentPage = 1;
                }
            }
        },
        judgeSearchGoodsNameEmpty(pageInit) {
            if (this.searchGoodsName && this.searchGoodsName.length > 0) {
                return true;
            }
            if (!pageInit) {
                $.message({
                    message: '请输入搜索内容',
                    type: 'info'
                });
            }
            return false;
        },
        searchGoodsResultToName(pageInit, clickSearch, pageNum, sort) {
            if (this.judgeSearchGoodsNameEmpty(pageInit)) {
                if (this.searchSortType !== 0 && sort === '0') {
                    this.searchSortType = 0;
                }
                this.pageInitRequestData(clickSearch, pageNum, sort);
            }
        },
        searchGoodsSort(sortType) {
            if (this.searchSortType !== sortType && this.judgeSearchGoodsNameEmpty(false)) {
                switch (sortType) {
                    case 0: // 综合
                        this.searchSortType = 0;
                        this.searchGoodsResultToName(false, false, this.searchShowCurrentPage.toString(), '0');
                        break;
                    case 2: // 销量
                        this.searchSortType = 2;
                        this.searchGoodsResultToName(false, false, this.searchShowCurrentPage.toString(), '2');
                        break;
                    case 34: // 价格
                        let sort = '4';
                        if (this.searchSortType === 4) {
                            this.searchSortType = 3;
                            sort = '3';
                        } else {
                            this.searchSortType = 4;
                        }
                        this.searchGoodsResultToName(false, false, this.searchShowCurrentPage.toString(), sort);
                        break;
                    default:
                        break;
                }
            }
        },
        searchGoodsPreNexPage(type, item, showPageNum, itemIndex) {
            switch (type) {
                case 1: // 上一页
                    if (this.searchShowCurrentPage !== 1) {
                        let newItemIndex = this.getPageNumOnShowPageCountItemIndex(showPageNum);
                        this.searchGoodsPreNexPage(2, item, showPageNum, newItemIndex);
                    }
                    break;
                case 2: // 选中页
                    {
                        if (item && (item.pagePoint || item.pageNum === this.searchShowCurrentPage)) {
                        } else {
                            if (this.judgeSearchGoodsNameEmpty(false)) {
                                if (this.searchTotalPageCountList.length <= this.searchShowMaxPageCount) {
                                    // if (item) {
                                    //     this.searchShowCurrentPage = item.pageNum;
                                    // } else {
                                    //     this.searchShowCurrentPage = itemIndex;
                                    // }
                                    this.searchShowCurrentPage = showPageNum;
                                    this.searchGoodsResultToName(false, false, this.searchShowCurrentPage.toString(), this.searchSortType.toString());
                                } else {
                                    // if (itemIndex + 1 < 6) {
                                    //     let tempSearchShowPageCountList = [];
                                    //     for (let i = 0; i < this.searchShowMaxPageCount; i++) {
                                    //         let tempItem = this.searchTotalPageCountList[i];
                                    //         if (i + 1 === this.searchShowMaxPageCount) {
                                    //             tempItem = this.searchTotalPageCountList[this.searchTotalPageCountList.length - 1];
                                    //         }
                                    //         tempItem.pagePoint = false;
                                    //         if (i + 1 === this.searchShowMaxPageCount - 1) {
                                    //             tempItem.pagePoint = true;
                                    //         }
                                    //         tempSearchShowPageCountList.push(tempItem);
                                    //     }
                                    //     this.searchShowPageCountList = tempSearchShowPageCountList;
                                    //     this.searchShowCurrentPage = showPageNum;
                                    // } else if (itemIndex + 1 === this.searchShowMaxPageCount) {
                                    //
                                    // } else {
                                    //
                                    // }
                                    switch (itemIndex + 1) {
                                        case 1:
                                        case 2:
                                            {
                                                let item_3 = this.searchShowPageCountList[2];
                                                if (item_3.pagePoint) {
                                                    let tempSearchShowPageCountList = [];
                                                    for (let i = 0; i < this.searchShowMaxPageCount; i++) {
                                                        let tempItem = this.searchTotalPageCountList[i];
                                                        let index = i + 1;
                                                        if (index === this.searchShowMaxPageCount) {
                                                            tempItem = this.searchTotalPageCountList[this.searchTotalPageCountList.length - 1];
                                                        }
                                                        tempItem.pagePoint = false;
                                                        if (index === this.searchShowMaxPageCount - 1) {
                                                            tempItem.pagePoint = true;
                                                        }
                                                        tempSearchShowPageCountList.push(tempItem);
                                                    }
                                                    this.searchShowPageCountList = tempSearchShowPageCountList;
                                                    this.searchShowCurrentPage = showPageNum;
                                                } else {
                                                    this.searchShowCurrentPage = showPageNum;
                                                }
                                                this.searchGoodsResultToName(false, false, this.searchShowCurrentPage.toString(), this.searchSortType.toString());
                                            }
                                            break;
                                        case 3:
                                        case 5:
                                        case 7:
                                            {
                                                this.searchShowCurrentPage = showPageNum;
                                                this.searchGoodsResultToName(false, false, this.searchShowCurrentPage.toString(), this.searchSortType.toString());
                                            }
                                            break;
                                        case 4:
                                            {
                                                let item_3 = this.searchShowPageCountList[2];
                                                if (item_3.pagePoint) {
                                                    let tempSearchShowPageCountList = [];
                                                    for (let i = 0; i < this.searchShowMaxPageCount; i++) {
                                                        let index = i + 1;
                                                        let tempItem = {};
                                                        if (index < 3) {
                                                            tempItem = this.searchTotalPageCountList[i];
                                                        }
                                                        if (index === this.searchShowMaxPageCount) {
                                                            tempItem = this.searchTotalPageCountList[this.searchTotalPageCountList.length - 1];
                                                        } else {
                                                            if (index > 3) {
                                                                if (index === 4) {
                                                                    tempItem = {
                                                                        pageNum: showPageNum - 1,
                                                                        pagePoint: false
                                                                    };
                                                                } else if (index === 5) {
                                                                    tempItem = {
                                                                        pageNum: showPageNum,
                                                                        pagePoint: false
                                                                    };
                                                                } else if (index === 6) {
                                                                    tempItem = {
                                                                        pageNum: showPageNum + 1,
                                                                        pagePoint: false
                                                                    };
                                                                }
                                                            }
                                                        }
                                                        tempItem.pagePoint = false;
                                                        if (index === 7) {
                                                            tempItem.pagePoint = true;
                                                            tempItem.pageNum = 0;
                                                        } else if (index === 3) {
                                                            if (showPageNum === 5) {
                                                                tempItem.pagePoint = false;
                                                                tempItem.pageNum = 3;
                                                            } else {
                                                                tempItem.pagePoint = true;
                                                                tempItem.pageNum = 0;
                                                            }
                                                        }
                                                        tempSearchShowPageCountList.push(tempItem);
                                                    }
                                                    this.searchShowPageCountList = tempSearchShowPageCountList;
                                                    this.searchShowCurrentPage = showPageNum;
                                                } else {
                                                    this.searchShowCurrentPage = showPageNum;
                                                }
                                                this.searchGoodsResultToName(false, false, this.searchShowCurrentPage.toString(), this.searchSortType.toString());
                                            }
                                            break;
                                        // case 10:
                                        // {
                                        //     let item_7 = this.searchShowPageCountList[6];
                                        //     let item_3 = this.searchShowPageCountList[2];
                                        //     if (!item_7.pagePoint) {
                                        //         let tempSearchShowPageCountList = [];
                                        //         for (let i = 0; i < this.searchShowMaxPageCount; i++) {
                                        //             let tempItem = this.searchTotalPageCountList[i];
                                        //             let index = i + 1;
                                        //             if (index === this.searchShowMaxPageCount) {
                                        //                 tempItem = this.searchTotalPageCountList[this.searchTotalPageCountList.length - 1];
                                        //             } else {
                                        //                 if (index > 3) {
                                        //                     if (index === 4) {
                                        //                         tempItem = {
                                        //                             pageNum: showPageNum - 1,
                                        //                             pagePoint: false
                                        //                         }
                                        //                     } else if (index === 5) {
                                        //                         tempItem = {
                                        //                             pageNum: showPageNum,
                                        //                             pagePoint: false
                                        //                         }
                                        //                     } else if (index === 6) {
                                        //                         tempItem = {
                                        //                             pageNum: showPageNum + 1,
                                        //                             pagePoint: false
                                        //                         }
                                        //                     }
                                        //                 }
                                        //             }
                                        //             tempItem.pagePoint = false;
                                        //             if (index === 7) {
                                        //                 tempItem.pagePoint = true;
                                        //                 tempItem.pageNum = 0;
                                        //             } else if (index === 3) {
                                        //                 tempItem.pagePoint = item_3.pagePoint;
                                        //                 if (tempItem.pagePoint) {
                                        //                     tempItem.pageNum = 0;
                                        //                 }
                                        //             }
                                        //             tempSearchShowPageCountList.push(tempItem);
                                        //         }
                                        //         this.searchShowPageCountList = tempSearchShowPageCountList;
                                        //         this.searchShowCurrentPage = showPageNum;
                                        //     } else {
                                        //         this.searchShowCurrentPage = showPageNum;
                                        //     }
                                        //     this.searchGoodsResultToName(false, false, this.searchShowCurrentPage.toString(), this.searchSortType.toString());
                                        // }
                                        //     break;
                                        case 6:
                                            {
                                                let item_7 = this.searchShowPageCountList[6];
                                                if (item_7.pagePoint) {
                                                    let tempSearchShowPageCountList = [];
                                                    let lastItem = showPageNum === this.searchTotalPageCountList.length - 2;
                                                    for (let i = 0; i < this.searchShowMaxPageCount; i++) {
                                                        let index = i + 1;
                                                        let tempItem = {};
                                                        if (index < 3) {
                                                            tempItem = this.searchTotalPageCountList[i];
                                                        }
                                                        if (index === this.searchShowMaxPageCount) {
                                                            tempItem = this.searchTotalPageCountList[this.searchTotalPageCountList.length - 1];
                                                        } else {
                                                            if (index > 3) {
                                                                if (index === 4) {
                                                                    tempItem = {
                                                                        pageNum: lastItem ? showPageNum - 2 : showPageNum - 1,
                                                                        pagePoint: false
                                                                    };
                                                                } else if (index === 5) {
                                                                    tempItem = {
                                                                        pageNum: lastItem ? showPageNum - 1 : showPageNum,
                                                                        pagePoint: false
                                                                    };
                                                                } else if (index === 6) {
                                                                    tempItem = {
                                                                        pageNum: lastItem ? showPageNum : showPageNum + 1,
                                                                        pagePoint: false
                                                                    };
                                                                }
                                                            }
                                                        }
                                                        tempItem.pagePoint = false;
                                                        if (index === 3) {
                                                            tempItem.pageNum = 0;
                                                            tempItem.pagePoint = true;
                                                        } else if (index === 7) {
                                                            if (lastItem) {
                                                                tempItem.pagePoint = false;
                                                                tempItem.pageNum = showPageNum + 1;
                                                            } else {
                                                                tempItem.pagePoint = true;
                                                                tempItem.pageNum = 0;
                                                            }
                                                        }
                                                        tempSearchShowPageCountList.push(tempItem);
                                                    }
                                                    this.searchShowPageCountList = tempSearchShowPageCountList;
                                                    this.searchShowCurrentPage = showPageNum;
                                                } else {
                                                    this.searchShowCurrentPage = showPageNum;
                                                }
                                                this.searchGoodsResultToName(false, false, this.searchShowCurrentPage.toString(), this.searchSortType.toString());
                                            }
                                            break;
                                        case 8:
                                            {
                                                let item_7 = this.searchShowPageCountList[6];
                                                if (item_7.pagePoint) {
                                                    let tempSearchShowPageCountList = [];
                                                    let totalIndex = 5;
                                                    for (let i = 0; i < this.searchShowMaxPageCount; i++) {
                                                        let index = i + 1;
                                                        let tempItem = {};
                                                        if (index < 3) {
                                                            tempItem = this.searchTotalPageCountList[i];
                                                        }
                                                        if (index > 3) {
                                                            tempItem = this.searchTotalPageCountList[this.searchTotalPageCountList.length - totalIndex];
                                                            totalIndex--;
                                                        }
                                                        tempItem.pagePoint = false;
                                                        if (index === 3) {
                                                            tempItem.pagePoint = true;
                                                            tempItem.pageNum = 0;
                                                        }
                                                        tempSearchShowPageCountList.push(tempItem);
                                                    }
                                                    this.searchShowPageCountList = tempSearchShowPageCountList;
                                                    this.searchShowCurrentPage = showPageNum;
                                                } else {
                                                    this.searchShowCurrentPage = showPageNum;
                                                }
                                                this.searchGoodsResultToName(false, false, this.searchShowCurrentPage.toString(), this.searchSortType.toString());
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                    }
                    break;
                case 3: // 下一页
                    if (this.searchShowCurrentPage !== this.searchTotalPageCountList.length) {
                        let newItemIndex = this.getPageNumOnShowPageCountItemIndex(showPageNum);
                        this.searchGoodsPreNexPage(2, item, showPageNum, newItemIndex);
                    }
                    break;
                default:
                    break;
            }
        },
        getPageNumOnShowPageCountItemIndex(showPageNum) {
            let itemIndex = 1;
            this.searchShowPageCountList.some(function(item, index) {
                if (item.pageNum === showPageNum) {
                    itemIndex = index;
                    return true;
                }
            });
            return itemIndex;
        }
    }
};
</script>
