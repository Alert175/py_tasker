(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Modal"],{"613f":function(e,t,s){},"714b":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wrapper-fixed grid-center"},[s("div",{staticClass:"close",on:{click:e.close}},[s("img",{staticClass:"icon-image",attrs:{src:"images/cancel.svg",alt:"close"}})]),"new_user"===e.property?s("div",{staticClass:"content grid-center"},[s("div",{staticClass:"header"},[e._v("Как к Вам обращаться?")]),s("div",{staticClass:"input_value grid-center"},[s("img",{staticClass:"icon-image",attrs:{src:"images/signature.svg",alt:"edit_text_task"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.new_user_name,expression:"new_user_name"}],attrs:{type:"text"},domProps:{value:e.new_user_name},on:{input:function(t){t.target.composing||(e.new_user_name=t.target.value)}}})]),s("button",{on:{click:e.regitry_new_user}},[e._v("Готово")])]):e._e(),"old_user"===e.property?s("div",{staticClass:"content grid-center"},[s("div",{staticClass:"header"},[e._v("Введите ваш ID")]),s("div",{staticClass:"input_value grid-center"},[s("img",{staticClass:"icon-image",attrs:{src:"images/signature.svg",alt:"edit_text_task"}}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user_id,expression:"user_id"}],attrs:{type:"text"},domProps:{value:e.user_id},on:{input:function(t){t.target.composing||(e.user_id=t.target.value)}}})]),s("button",{on:{click:e.login}},[e._v("Войти")])]):e._e(),s("transition",{attrs:{name:"show",mode:"out-in"}},[e.show_popup?s("popup",{attrs:{info:e.info_for_popup,color:e.popup_color},on:{close_popup:function(t){e.show_popup=!1}}}):e._e()],1)],1)},n=[],a=(s("96cf"),s("3b8d")),i=s("bc3a"),o={components:{popup:function(){return s.e("Popup").then(s.bind(null,"3905"))}},props:{settings:{type:String,default:void 0}},data:function(){return{property:null,new_user_name:null,info_for_buffer:null,user_id:null,show_popup:!1,info_for_popup:null,popup_color:null}},methods:{read_props:function(){void 0!==this.settings&&(this.property=this.settings),console.log(this.property)},call_popup:function(e,t){this.info_for_popup=e,this.popup_color=t,this.show_popup=!0},close:function(){this.$emit("close_modal")},regitry_new_user:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(null===this.new_user_name||""===this.new_user_name){e.next=13;break}return e.prev=1,e.next=4,i.post("api/auth/create_user",{new_user_name:String(this.new_user_name)});case 4:t=e.sent,t.data.hasOwnProperty("id_user")?(localStorage.setItem("user_id",t.data.id_user),localStorage.setItem("auth",!0),this.$router.push("/")):console.log("id user not found"),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),console.error(e.t0);case 11:e.next=14;break;case 13:this.call_popup("необходимо заполнить поле","255, 98, 98, 1");case 14:case"end":return e.stop()}}),e,this,[[1,8]])})));function t(){return e.apply(this,arguments)}return t}(),login:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,null===this.user_id||""===this.user_id){e.next=11;break}return e.next=4,i.post("api/auth/login",{user_id:JSON.stringify(this.user_id)});case 4:t=e.sent,localStorage.setItem("auth",!0),localStorage.setItem("user_id",this.user_id),this.call_popup("Добро пожаловать ".concat(t.data.user_name),"83, 144, 219, 1"),this.$router.push("/"),e.next=12;break;case 11:this.call_popup("необходимо заполнить поле","255, 98, 98, 1");case 12:e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](0),401==e.t0.response.status?this.call_popup("пользователь не найден","255, 98, 98, 1"):(console.error(e.t0),this.call_popup("попробуйте еще раз","255, 98, 98, 1"));case 17:case"end":return e.stop()}}),e,this,[[0,14]])})));function t(){return e.apply(this,arguments)}return t}()},created:function(){this.read_props()}},u=o,p=(s("ce69"),s("2877")),c=Object(p["a"])(u,r,n,!1,null,"362c1f32",null);t["default"]=c.exports},ce69:function(e,t,s){"use strict";var r=s("613f"),n=s.n(r);n.a}}]);
//# sourceMappingURL=Modal.8fe42030.js.map