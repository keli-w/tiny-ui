// miniprogram_npm/lin-ui/circle/index.js
Component({
  /**
   * 组件的属性列表
   */
  props: {
    percent: 0,
    outerDiameter: 220,
    innerDiameter: 170,
    activeColor: '',
    backgroundColor: '#EBEBEB',
    innerColor: '#FFFFFF',
    active: false,
    duration: 30,
    showValue: false,
    valueColor: '',
    valueSize: 25,
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayPercent: 0,
  },

  didMount() {
    this.percent(this.props.percent);
    this.outerDiameter();
    this.innerDiameter();
  },

  didUpdate(prevProps) {
    const { percent, outerDiameter, innerDiameter } = this.props;
    const {
      percent: prepRecent,
      outerDiameter: preOuterDiameter,
      innerDiameter: preInnerDiameter,
    } = prevProps;
    if (percent !== prepRecent) {
      this.percent(percent);
    }

    if (outerDiameter !== preOuterDiameter) {
      this.outerDiameter(outerDiameter);
    }

    if (innerDiameter !== preInnerDiameter) {
      this.innerDiameter(innerDiameter);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async percent(percent) {
      if (percent > 100) {
        this.setData({
          percent: 100,
        });
        return;
      }
      if (percent < 0) {
        this.setData({
          percent: 0,
        });
        return;
      }
      if (this.props.active) {
        let displayPercent = this.data.displayPercent;

        if (displayPercent < percent) {
          while (displayPercent < percent) {
            await this.sleep(this.props.duration);
            displayPercent += 1;
            this.setData({
              displayPercent: displayPercent,
            });
          }
        } else if (displayPercent > percent) {
          while (displayPercent > percent) {
            await this.sleep(this.props.duration);
            displayPercent -= 1;
            this.setData({
              displayPercent,
            });
          }
        }
      } else {
        this.setData({
          displayPercent: percent,
        });
      }
    },

    outerDiameter(outerDiameter) {
      if (outerDiameter < this.props.innerDiameter) {
        outerDiameter = this.props.innerDiameter;
        this.setData({
          outerDiameter,
        });
      }
    },

    innerDiameter(innerDiameter) {
      if (innerDiameter < 0) {
        this.setData({
          innerDiameter: 0,
        });
      }
    },

    sleep(milSec) {
      return new Promise((resolve) => {
        setTimeout(resolve, milSec);
      });
    },
  },
});
