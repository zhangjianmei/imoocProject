<template>
    <div class="search" :style="searchStyle">
        <img class="search-icon" :src="icon" alt="" srcset="">
        <input class="search-hint" :style="hintStyle" placeholder="大前端开发，混合京东商城系统" ></input>
    </div>
</template>


<script>
export default {
    props: {
        bgColor: {
            default: '#ffffff',
            type: String
        },
        hintColor: {
            default: '#999999',
            type: String
        },
        icon: {
            default: require('@img/search.svg'),
            type: String
        },

    },
    computed: {
        searchStyle: function () {
            return {
                backgroundColor: this.bgColor
            }
        },
        hintStyle: function () {
            return {
                color: this.hintColor
            }
        }
    },
    methods: {
    }
}
</script>


<style lang="scss" scoped>
@import '@css/style.scss';
    .search {
        background-color: white;
        width: 100%;
        margin:12px;
        border-radius:44px;
        display: flex;
        align-items: center;
        .search-icon {
            margin-left:16px;
            width:32px;
        }
        .search-hint {
            margin-left: 16px; flex: 1;
            font-size: 24px;
            color: $textHintColor; background: none;
        }
    }
</style>
