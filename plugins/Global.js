import axios from "axios";
import _ from "lodash";
// 请求地址前缀
// 正式环境>
let domain = "https://mengdata.maijimaiji.cn";
// 预发布环境
// let domain = 'https://pre.maijimeng.com';
// 预发布环境
// let domain = "http://47.107.63.102:10000";
// 测试环境
// let domain = "http://120.78.92.210:10000"
// 这是什么环境
// let domain = 'http://menguat.maijimaiji.cn';

// 查询推荐位
import _getRecObjectList from "./api/getRecObjectList";
// 查询资源详情
import _queryResItemDetail from "./api/queryResItemDetail";
// 查询专辑
import _getActProgram from "./api/getActProgram";
// 查询季播详情
import _queryMarkSortDetail from "./api/queryMarkSortDetail";
// 查询资源项 - 剧集
import _queryResItems from "./api/queryResItems";
// 获取播放地址
import _getPlayAddress from "./api/getPlayAddress";
// 获取视频评论
import _getCommentList from "./api/getCommentList";
// 获取萌娃视频
import _getActWorks from "./api/getActWorks";
// 获取花絮等
import _queryLastResItems from "./api/queryLastResItems";
// 获取已购订单
import _getOrderLists from "./api/getOrderLists";
// 商品浏览纪律
import _getBrowseGoodsList from "./api/getBrowseGoodsList";
// 查询动漫卡通剧集
import _queryItemsByMarkSort from "./api/queryItemsByMarkSort";
// 查询隐私协议
import _privacy from "./api/privacy";
// 查询个人信息
import _getUserInfo from "./api/getUserInfo";
// 查询省级列表
import _getProvinces from "./api/getProvinces";
// 查询市级列
import _getCities from "./api/getCities";
// 获取区
import _getAreas from "./api/getAreas";
// 完善个人信息
import _completeUserInfo from "./api/completeUserInfo";
// 查询购物车列表
import _itemCartV1 from "./api/itemCartV1";
// 添加视频播放记录
import _addVideoRecord from "./api/addVideoRecord";
// 查找地址列表
import _findAddressList from "./api/findAddressList";
// 获取视频播放列表
import _getPlayAddressList from "./api/getPlayAddressList";
// 获取优惠券列表
import _getCouponListAll from "./api/getCouponListAll";
// 获取萌娃视频
import _getDareWorkTop from "./api/getDareWorkTop";
// 获取视频凭证
import _getVideoPlayAuth from "./api/getVideoPlayAuth";
// 获取知识详情
import _getKnowledgeDetails from "./api/getKnowledgeDetails";
// 获取麦咭秒杀
import _activityList from "./api/activityList";
// 获取商品详情
import _getGoodsDetails from "./api/getGoodsDetails";
// 获取商户信息
import _getChantInfo from "./api/getChantInfo";
// 获取商品收藏状态
import _checkCollectStatus from "./api/checkCollectStatus";
// 获取相似商品
import _getSimilarGoodsList from "./api/getSimilarGoodsList";
// 获取历史记录
import _playHistory from "./api/playHistory";
// 搜索视频
import _search from "./api/search";
// 跳转参数
import _jumpParams from "./api/jumpParams";
// 排行榜
import _getRankList from "./api/getRankList";
// 萌宝视频的评论
import _actActWAorksGetCommentList from "./api/actActWAorksGetCommentList";
// 获取萌宝视频
import _mktGetChoiceWorks from "./api/mktGetChoiceWorks";
// 获取在线教室数据
import _merKnowledgeList from "./api/merKnowledgeList";
// 获取上传首页栏目
import _getChantMallCategoryList from "./api/getChantMallCategoryList";
// 获取商城首页数据
import _merMallGetMallHomeData from "./api/merMallGetMallHomeData";
// 获取商城-猜你喜欢
import _getPersonRecommendGoodsList from "./api/getPersonRecommendGoodsList";
// 关注的店铺
import _followChantList from "./api/followChantList";
// 订单预支付
import _merMallPayOrder from "./api/merMallPayOrder";
// 获取资讯列表
import _getAllToplineInfList from "./api/getAllToplineInfList";
// 获取视频推荐
import _merRecommendSimilar from "./api/merRecommendSimilar";
// 消息列表
import _msgList from "./api/msgList";
// 获取最新的萌娃秀视频
import _getNewWorksList from "./api/getNewWorksList";

// 默认导出
export default (context, inject) => {
    // 全局方法初始化
    let getRecObjectList = _getRecObjectList(context);
    let queryResItemDetail = _queryResItemDetail(context);
    let getActProgram = _getActProgram(context);
    let queryMarkSortDetail = _queryMarkSortDetail(context);
    let queryResItems = _queryResItems(context);
    let getPlayAddress = _getPlayAddress(context);
    let getCommentList = _getCommentList(context);
    let getActWorks = _getActWorks(context);
    let queryLastResItems = _queryLastResItems(context);
    let getOrderLists = _getOrderLists(context);
    let getBrowseGoodsList = _getBrowseGoodsList(context);
    let queryItemsByMarkSort = _queryItemsByMarkSort(context);
    let privacy = _privacy(context);
    let getUserInfo = _getUserInfo(context);
    let getProvinces = _getProvinces(context);
    let getCities = _getCities(context);
    let getAreas = _getAreas(context);
    let completeUserInfo = _completeUserInfo(context);
    let itemCartV1 = _itemCartV1(context);
    let addVideoRecord = _addVideoRecord(context);
    let findAddressList = _findAddressList(context);
    let getPlayAddressList = _getPlayAddressList(context);
    let getCouponListAll = _getCouponListAll(context);
    let getDareWorkTop = _getDareWorkTop(context);
    let getVideoPlayAuth = _getVideoPlayAuth(context);
    let getKnowledgeDetails = _getKnowledgeDetails(context);
    let activityList = _activityList(context);
    let getGoodsDetails = _getGoodsDetails(context);
    let getChantInfo = _getChantInfo(context);
    let checkCollectStatus = _checkCollectStatus(context);
    let getSimilarGoodsList = _getSimilarGoodsList(context);
    let playHistory = _playHistory(context);
    let search = _search(context);
    let getRankList = _getRankList(context);
    let actActWAorksGetCommentList = _actActWAorksGetCommentList(context);
    let mktGetChoiceWorks = _mktGetChoiceWorks(context);
    let merKnowledgeList = _merKnowledgeList(context);
    let getChantMallCategoryList = _getChantMallCategoryList(context);
    let merMallGetMallHomeData = _merMallGetMallHomeData(context);
    let getPersonRecommendGoodsList = _getPersonRecommendGoodsList(context);
    let followChantList = _followChantList(context);
    let merMallPayOrder = _merMallPayOrder(context);
    let msgList = _msgList(context);
    let getAllToplineInfList = _getAllToplineInfList(context);
    let merRecommendSimilar = _merRecommendSimilar(context);
    let getNewWorksList = _getNewWorksList(context);
    let jumpParams = _jumpParams;

    // 敬请期待
    let pleaseWait = async function() {
        alert("敬请期待");
    };
    inject("domain", domain);
    inject("msgCode", {
        success: "00000"
    });

    inject("queryResItemDetail", queryResItemDetail);
    inject("getRecObjectList", getRecObjectList);
    inject("getActProgram", getActProgram);
    inject("queryMarkSortDetail", queryMarkSortDetail);
    inject("queryResItems", queryResItems);
    inject("getPlayAddress", getPlayAddress);
    inject("getCommentList", getCommentList);
    inject("getActWorks", getActWorks);
    inject("queryLastResItems", queryLastResItems);
    inject("getOrderLists", getOrderLists);
    inject("getBrowseGoodsList", getBrowseGoodsList);
    inject("queryItemsByMarkSort", queryItemsByMarkSort);
    inject("privacy", privacy);
    inject("getUserInfo", getUserInfo);
    inject("getProvinces", getProvinces);
    inject("getCities", getCities);
    inject("getAreas", getAreas);
    inject("completeUserInfo", completeUserInfo);
    inject("itemCartV1", itemCartV1);
    inject("addVideoRecord", addVideoRecord);
    inject("findAddressList", findAddressList);
    inject("getPlayAddressList", getPlayAddressList);
    inject("getCouponListAll", getCouponListAll);
    inject("getDareWorkTop", getDareWorkTop);
    inject("getVideoPlayAuth", getVideoPlayAuth);
    inject("getKnowledgeDetails", getKnowledgeDetails);
    inject("activityList", activityList);
    inject("getGoodsDetails", getGoodsDetails);
    inject("getChantInfo", getChantInfo);
    inject("checkCollectStatus", checkCollectStatus);
    inject("getSimilarGoodsList", getSimilarGoodsList);
    inject("playHistory", playHistory);
    inject("search", search);
    inject("getRankList", getRankList);
    inject("actActWAorksGetCommentList", actActWAorksGetCommentList);
    inject("mktGetChoiceWorks", mktGetChoiceWorks);
    inject("merKnowledgeList", merKnowledgeList);
    inject("getChantMallCategoryList", getChantMallCategoryList);
    inject("merMallGetMallHomeData", merMallGetMallHomeData);
    inject("getPersonRecommendGoodsList", getPersonRecommendGoodsList);
    inject("followChantList", followChantList);
    inject("merMallPayOrder", merMallPayOrder);
    inject("msgList", msgList);
    inject("getAllToplineInfList", getAllToplineInfList);
    inject("merRecommendSimilar", merRecommendSimilar);
    inject("getNewWorksList", getNewWorksList);
    inject("jumpParams", jumpParams);

    // ---------------------------------------------
    inject("pleaseWait", pleaseWait);
};