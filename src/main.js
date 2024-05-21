import quasarLang from 'quasar/lang/zh-CN'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import {createApp, ref} from 'vue'
import App from './App.vue'
import 'normalize.css'
import router from "@/router/router.js";
// 1. 引入你需要的组件
import {Button} from 'vant';
import {Dialog} from "vant";

// 2. 引入组件样式
import 'vant/lib/index.css';
import {Form, Field, CellGroup} from 'vant';
import {NavBar, Icon} from 'vant'
import {Tabbar, TabbarItem} from 'vant';
import {Card} from 'vant';
import {Image as VanImage} from 'vant';
import {Toast} from 'vant';
import {Uploader} from 'vant';
import {Search} from "vant";
import {NoticeBar} from 'vant';
import {TreeSelect} from 'vant';
import {Divider} from 'vant';
import {Tag} from 'vant';
import {
    Skeleton,
    SkeletonTitle,
    SkeletonImage,
    SkeletonAvatar,
    SkeletonParagraph,
} from 'vant';
import {Signature} from 'vant';
import {Swipe, SwipeItem} from 'vant';
import {Tab, Tabs} from 'vant';
import {Collapse, CollapseItem} from 'vant';
import {ActionSheet} from 'vant';
import {Cascader} from 'vant';
import {Cell} from 'vant';
import {Empty} from 'vant';
import {Loading} from 'vant';
import {Picker} from 'vant';
import {DatePicker} from 'vant';
import {Stepper} from 'vant';
import {RadioGroup, Radio} from 'vant';
import { Popup } from 'vant';
import {
    Quasar,
    Notify
} from 'quasar'
import pinia from '@/store/index'


const app = createApp(App)
app.use(pinia)
app.use(Quasar, {
    plugins: {Notify}, // import Quasar plugins and add here
    lang: quasarLang,
    config: {
        notify: { /* look at QuasarConfOptions from the API card */ }
    }
})
app.use(Popup)
app.use(Dialog)
app.use(RadioGroup)
app.use(Radio)
app.use(Stepper)
app.use(router)
app.use(Button)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(NavBar)
app.use(Icon)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Card)
app.use(VanImage)
app.use(Toast)
app.use(Uploader)
app.use(Search)
app.use(NoticeBar)
app.use(TreeSelect)
app.use(Divider)
app.use(Tag)
app.use(Skeleton);
app.use(SkeletonTitle);
app.use(SkeletonImage);
app.use(SkeletonAvatar);
app.use(SkeletonParagraph);
app.use(Signature);
app.use(Swipe);
app.use(SwipeItem);
app.use(Tab);
app.use(Tabs);
app.use(Collapse);
app.use(CollapseItem);
app.use(ActionSheet);
app.use(Cascader)
app.use(Cell)
app.use(Empty)
app.use(Loading)
app.use(Picker)
app.use(DatePicker)
app.mount('#app')

