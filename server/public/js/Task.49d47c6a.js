(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Task"],{1615:function(t,s,e){"use strict";var n=e("41fc"),o=e.n(n);o.a},"41fc":function(t,s,e){},"43fe":function(t,s,e){"use strict";e.r(s);var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"wrapper"},[e("div",{staticClass:"content"},[e("div",{class:{container:!0,"col-3":!0,warning:t.expired_task,active:!t.expired_task}},[e("div",{class:{status:!0,oval:!0,succesfull:t.info.status_complete},on:{click:t.change_status_task}},[e("span",{class:{circle:!0,left:!t.info.status_complete,right:t.info.status_complete}})]),e("div",{staticClass:"text"},[t._v("\n\t\t\t\t"+t._s(t.info.description)+"\n\t\t\t")]),e("button",{on:{click:function(s){t.show_edit_task=!0}}},[e("img",{staticClass:"icon-image",attrs:{src:"images/edit.svg",alt:"edit_task"}})])])]),e("transition",{attrs:{name:"show",mode:"out-in"}},[t.show_popup?e("popup",{attrs:{info:t.info_for_popup,color:t.popup_color},on:{close_popup:function(s){t.show_popup=!1}}}):t._e(),t.show_edit_task?e("edit-task",{attrs:{task:t.info},on:{close_edit_task:function(s){t.show_edit_task=!1}}}):t._e()],1)],1)},o=[],i=(e("96cf"),e("3b8d")),a=e("bc3a"),p={components:{popup:function(){return e.e("Popup").then(e.bind(null,"3905"))},EditTask:function(){return e.e("Popup").then(e.bind(null,"1ac1"))}},props:{task:{type:Object,default:null}},data:function(){return{info:{},show_popup:!1,info_for_popup:null,popup_color:null,show_edit_task:!1,expired_task:!1}},methods:{read_props:function(){this.info=this.task},call_popup:function(t,s){this.info_for_popup=t,this.popup_color=s,this.show_popup=!0},change_status_task:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.info.status_complete=!this.info.status_complete,t.next=4,a.put("api/task/change_status_task",{id_user:localStorage.getItem("user_id"),id_task:this.info.id_task,status_task:JSON.stringify(this.info.status_complete)});case 4:t.sent,t.next=11;break;case 7:t.prev=7,t.t0=t["catch"](0),console.error(t.t0),this.call_popup("Ошибка","255, 98, 98, 1");case 11:case"end":return t.stop()}}),t,this,[[0,7]])})));function s(){return t.apply(this,arguments)}return s}(),time_check:function(){this.info.hasOwnProperty("deadline")&&(new Date).getTime()>this.info.deadline&&(this.call_popup("Просрочена задача","255, 98, 98, 1"),this.expired_task=!0)}},created:function(){var t=this;this.read_props(),setTimeout((function(){t.time_check()}),2e3)}},c=p,r=(e("1615"),e("2877")),u=Object(r["a"])(c,n,o,!1,null,"79b5767d",null);s["default"]=u.exports}}]);
//# sourceMappingURL=Task.49d47c6a.js.map