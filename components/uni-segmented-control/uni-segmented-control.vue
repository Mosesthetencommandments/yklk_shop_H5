<template>
  <view
    :class="{ text: styleType === 'text' }"
    :style="{ borderColor: styleType === 'text' ? '' : activeColor }"
    class="segmented-control"
  >
    <view
      v-for="(item, index) in values"
      :class="[{ text: styleType === 'text' }, { active: index === currentIndex }]"
      :key="index"
      :style="{
        color:
          index === currentIndex
            ? styleType === 'text'
              ? activeColor
              : '#fff'
            : styleType === 'text'
              ? '#000'
              : activeColor,
        backgroundColor: index === currentIndex && styleType === 'button' ? activeColor : ''
      }"
      class="segmented-control-item"
      @click="_onClick(index)"
    >
      {{ item }}
	  <view class="item-bottom"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UniSegmentedControl',
  props: {
    current: {
      type: Number,
      default: 0
    },
    values: {
      type: Array,
      default () {
        return []
      }
    },
    activeColor: {
      type: String,
      default: '#007aff'
    },
    styleType: {
      type: String,
      default: 'button'
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  watch: {
    current (val) {
      if (val !== this.currentIndex) {
        this.currentIndex = val
      }
    }
  },
  created () {
    this.currentIndex = this.current
  },
  methods: {
    _onClick (index) {
      if (this.currentIndex !== index) {
        this.currentIndex = index
        this.$emit('clickItem', index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.segmented-control {
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 81upx;
	line-height: 81upx;
	font-size: 26upx;
	box-sizing: border-box;
	// margin: 0 auto;
	margin:0;
	overflow: hidden;

	border: 1px solid;
	border-radius: 10upx;

	&.text {
		border: 0;
		border-radius: 0;
	}
}

.segmented-control-item {
	flex: 1;
	text-align: center;
	line-height: 81upx;
	box-sizing: border-box;
	color:#666666;
	border-left: 1px solid;

	&.active {
		color: #fff;
	}

	&.text {
		border-left: 0;
		color: #000;

		&.active {
			// border-bottom-style: solid;
			.item-bottom{
				width:38upx;
				height: 6upx;
				background: #369eff;
				margin:-6upx auto 0;
			}
		}
	}

	&:first-child {
		border-left-width: 0;
	}
	
}
</style>
