import store from '@/store'
const version = require('element-ui/package.json').version
import {Message} from "element-ui";
import i18n from '@/lang'
import variables from '@/styles/element-variables.scss'

const ORIGINAL_THEME = '#409EFF' // default color

export default {
  first: true,
  async set (val) {

    try{
      // 首次加载时CSS为elementui默认值，需替换为settings.theme,之后需要替换的便是原theme值了
      // edit by Joyboo 2021-06-16将.css文件本地化，import位置移动到 App.vue
      const oldVal = this.first ? ORIGINAL_THEME : store.state.settings.theme
      // const oldVal = this.first ? variables.theme : store.state.settings.theme
      // console.log('Okd', oldVal, variables.theme, val)

      if (typeof val !== 'string') return
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      // console.log(themeCluster, originalCluster)

      var $message = Message({
        message: '  ' + i18n.t('settings.setThemeIng'),
        customClass: 'theme-message',
        type: 'success',
        duration: 0,
        iconClass: 'el-icon-loading'
      })

      const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })


      styles.forEach(style => {
        const {innerText} = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })

      this.first = false
    } catch (e) {
      console.log('utils settheme error ', e)
    }

    $message && $message.close()
  },
  updateStyle(style, oldCluster, newCluster) {
    let newStyle = style
    oldCluster.forEach((color, index) => {
      newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
    })
    return newStyle
  },

  getThemeCluster(theme) {
    const tintColor = (color, tint) => {
      let red = parseInt(color.slice(0, 2), 16)
      let green = parseInt(color.slice(2, 4), 16)
      let blue = parseInt(color.slice(4, 6), 16)

      if (tint === 0) { // when primary color is in its rgb space
        return [red, green, blue].join(',')
      } else {
        red += Math.round(tint * (255 - red))
        green += Math.round(tint * (255 - green))
        blue += Math.round(tint * (255 - blue))

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }
    }

    const shadeColor = (color, shade) => {
      let red = parseInt(color.slice(0, 2), 16)
      let green = parseInt(color.slice(2, 4), 16)
      let blue = parseInt(color.slice(4, 6), 16)

      red = Math.round((1 - shade) * red)
      green = Math.round((1 - shade) * green)
      blue = Math.round((1 - shade) * blue)

      red = red.toString(16)
      green = green.toString(16)
      blue = blue.toString(16)

      return `#${red}${green}${blue}`
    }

    const clusters = [theme]
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
    }
    clusters.push(shadeColor(theme, 0.1))
    return clusters
  }
}


