<template>
    <div class="seconds">
        <div class="seconds-wrap">
            <p class="seconds-wrap-title">京东秒杀</p>
          <count-down :endHours="16"></count-down>
        </div>
        <div class="seconds-content">
            <div class="seconds-item" v-for="(item, index) in dataSource" :key="index">
                <img class="seconds-item-icon" :src="item.icon" alt="" srcset="">
                <p class="seconds-item-price">￥{{item.price | priceValue}}</p>
                <p class="seconds-item-old-price">￥{{item.oldPrice | priceValue}}</p>
            </div>
        </div>
    </div>
</template>


<script>
  import CountDown from '@c/seconds/CountDown.vue';

export default {
    props: {
        dataSource: {
            type: Array,
            required: true,
            default: function () {
                return [
                    {
                        id: '',
                        icon: '',
                        price: '',
                        oldPrice: ''
                    }
                ]
            }
        }
    },
    components: {
      CountDown
    }
}
</script>

<style lang="scss" scoped>

@import '@css/style.scss';

    .seconds {
        background-color: white;
        border-radius: 12px;
        margin: 16px;

        &-wrap {
            display: flex;
            padding: 16px;
            &-title {
                font-size: 28px;
                display: inline-block;
            }
        }

        &-content {
            padding: 16px 0;
            display: flex;
            overflow: hidden;
            overflow-x: scroll;


            .seconds-item {
                padding: 0 24px;
                text-align: center;

                &-icon {
                    width:132px;
                    height: 132px;
                }

                &-price {
                    color: $mainColor;
                    font-size:28px;
                }

                &-old-price {
                    color: $textHintColor;
                    font-size: 24px;
                    margin-top: 12px;
                    text-decoration: line-through;
                }
            }

        }


    }

</style>
