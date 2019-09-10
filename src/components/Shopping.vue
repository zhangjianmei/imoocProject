<template>
<div class="shopping">
    <navgation-bar :isShowBack="false" :pageName="'购物车'"></navgation-bar>

    <div class="shopping-content">
        <div class="shopping-content-list">
            <div class="shopping-content-list-item" v-for="(item, index) in shoppingDatas" :key="index">
                <img class="shopping-content-list-item-check" :src="checkIcon(item.isCheck)"
                 @click="onCheckClick(item)">
                <img class="shopping-content-list-item-img" :src="item.img">
                <div class="shopping-content-list-item-desc">
                    <p class="shopping-content-list-item-desc-name" :class="{'shopping-content-list-item-desc-name-hint' : !item.isHave}">
                        <direct v-if="item.isDirect"></direct>
                        <no-have v-if="!item.isHave"></no-have>
                        {{item.name}}
                    </p>
                    <div class="shopping-content-list-item-desc-data">
                        <p class="shopping-content-list-item-desc-data-price">￥{{item.price | priceValue}}</p>
                        <goods-number-manager :defaultNumber="item.number" @onNumberChange="onNumberChange(arguments, item, index)"></goods-number-manager>
                    </div>
                </div>
            </div>
        </div>

        <div class="shopping-content-total">

           <div class="shopping-content-total-check">
             <img  :src="checkIcon(totalDatas.isAll)"
                 @click="onCheckAllClick()">
             <p>全选</p>
           </div>

           <div class="shopping-content-total-price">
             <p class="shopping-content-total-price-total">合计：<span>￥{{totalDatas.totalPrice | priceValue}}</span></p>
             <p class="shopping-content-total-price-all">总额:<span>￥{{totalDatas.totalPrice | priceValue}}</span>&nbsp;&nbsp;立减:<span>￥00.00</span></p>
           </div>

           <div class="shopping-content-total-settlement">
             去结算({{totalDatas.goodsNumber}})
            </div>

        </div>
    </div>
</div>
</template>

<script>
import NavgationBar from "@c/currency/NavigationBar";
import direct from "@c/goods/Direct";
import NoHave from "@c/goods/NoHave";
import GoodsNumberManager from "@c/goods/GoodsNumberManager";
export default {
    components: {
        NavgationBar,
        direct,
        NoHave,
        GoodsNumberManager
    },
    methods: {

    },
    data: function () {
        return {
            shoppingDatas: this.$store.state.shoppingDatas,
            totalDatas: {
              isAll: false,
              totalPrice: 0,
              goodsNumber: 0
            }
        };
    },
    methods: {
      /**
       * 商品是否选中的点击事件
       */
      onCheckClick: function (item) {
        item.isCheck = !item.isCheck;
        this.computeGoodsTotal();
      },
      /**
       * 返回check图标
       */
      checkIcon: function (check) {
        return check ? require('@img/check.svg') : require('@img/no-check.svg');
      },
      /**
       * 全选按钮
       */
      onCheckAllClick: function () {
        this.totalDatas.isAll = !this.totalDatas.isAll;

        this.shoppingDatas.forEach(item => item.isCheck = this.totalDatas.isAll);
        this.computeGoodsTotal();
      },
      /**
       * 监听选中变化
       */
      computeGoodsTotal: function () {
        this.totalDatas = {
          isAll: true,
          totalPrice: 0,
          goodsNumber: 0
        }

        this.shoppingDatas.forEach(item => {
          if (!item.isCheck) {
            this.totalDatas.isAll = false;
          } else {
            this.totalDatas.totalPrice += parseFloat(item.price) * parseInt(item.number);
            this.totalDatas.goodsNumber += parseInt(item.number);
          }
        });


      },
      /**
       * 监听商品数量的变化
       */
      onNumberChange: function ($arguments, item, index) {
        let number = $arguments[0];
        this.$store.commit('changeShoppingDataNumber', {
          index: index,
          number: number
        });

        if (item.isCheck) {
          this.computeGoodsTotal();
        }
      }

    },
};
</script>

<style lang="scss" scoped>
@import "@css/style.scss";

.shopping {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-flow: column;

    .shopping-content {
        background-color: $bgColor;
        border-top: 2 solid $lineColor;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        &-list {
            height: 100%;
            overflow: hidden;
            overflow-y: auto;

            &-item {
                background-color: white;
                padding: 16px;
                display: flex;
                border-bottom: 2 solid $lineColor;

                &-check {
                  width: 36px;
                  align-self: center;
                  padding: 12px;
                }

                &-img {
                    width: 200px;
                    height: 200px;
                }

                &-desc {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 0 16px;

                    &-name {
                        font-size: 28px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-break: break-word;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        display: -webkit-box;
                        line-height: 36px;

                        &-hint {
                            color: $textHintColor;
                        }
                    }

                    &-data {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 16px;

                        &-price {
                            font-size: 32px;
                            color: $mainColor;
                            font-weight: 500;
                        }

                    }
                }
            }
        }

        &-total {
          height: 112px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          background-color: white;
          border-top: 2px solid $lineColor;
           padding: 20px;

          &-check {
            display: flex;
            align-items: center;
            margin-left: 16px;
            margin-right: 16px;
            img {
              width: 36px;
              padding: 12px;
            }

            p {
              font-size: 28px;
            }

          }

          &-price {
            flex-grow: 2;
            display: flex;
            flex-direction: column;
            &-total {
              font-size: 32px;
              margin-bottom: 12px;
              span {
                font-weight: bold;
              }
            }

            &-all {
              font-size: 24px;
              span {
                font-weight: bold;
              }
            }
          }

          &-settlement {
            width: 240px;
            height: 100%;
            font-size: 32px;
            background-color: $mainColor;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
          }

        }
    }
}
</style>
