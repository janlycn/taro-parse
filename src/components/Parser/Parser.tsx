import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import Decode from "../Decode/decode";
import {Props, State} from "./interface";
import convert from './index'
import {Data} from "../data"
import './index.scss'

export default class Parser extends Component<Props, State> {

  imgClick = (src) => {
    if (this.props.onImgClick) {
      this.props.onImgClick(src)
    }
  }

  linkClick = (href) => {
    if (this.props.onLinkClick) {
      this.props.onLinkClick(href)
    }
  }

  componentWillMount() {
    const {content, type} = this.props
    const nodes = convert(content || '', type) as unknown as Data
    this.setState({
      nodes: nodes
    })
  }

  options = {
    addGlobalClass: true
  }

  render() {
    const {nodes} = this.state
    const {latexApi, yumlApi,theme} = this.props
    const className = '~h2w ~h2w-' + (theme ? theme : 'light')
    return (
      <View className={className}>
        <View className='~h2w__main'>
          {nodes &&
          <Decode latexApi={latexApi} yumlApi={yumlApi} onImgClick={this.imgClick} onLinkClick={this.linkClick}
            nodes={nodes}
          />}
        </View>
      </View>
    )
  }
}