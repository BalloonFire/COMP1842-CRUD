import Vue from 'vue';
import Router from 'vue-router';
import Words from './views/Words.vue';
import Add from './views/Add.vue';
import Display from './views/Display.vue';
import Edit from './views/Edit.vue';
import Test from './views/Test.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path:'/',
            redirect:'/words'
        },
        {
            path:'/words',
            name: 'words',
            component: Words
        },
        {
            path:'/words/add',
            name: 'add-word',
            component: Add
        },
        {
            path:'/words/:id',
            name: 'display',
            component: Display
        },
        {
            path:'/words/:id/edit',
            name: 'edit',
            component: Edit
        },
        {
            path:'/test',
            name: 'test',
            component: Test
        },
        {
            path:'/tvwp2',
            name: 'about',
            component: About
        }
    ]
});