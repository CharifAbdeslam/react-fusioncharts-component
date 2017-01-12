import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Prism from 'prismjs';
// import bootstrap from 'bootstrap';

window.jQuery = $;

window.bootstrap = require('bootstrap');
window.ReactDOM = ReactDOM;

var code = {
    'ex1': {
        'html': '<div id=\'chart-container\'></div>',
        'jsfiddle': 'http://jsfiddle.net/fusioncharts/f0b2e0ms/'
    },
    'ex2': {
        'html': '<div id=\'chart-container\'></div>',
        'jsfiddle': 'http://jsfiddle.net/fusioncharts/3r627e9h/'
    },
    'ex3': {
        'html': '<div id=\'chart-container\'></div>',
        'jsfiddle': 'http://jsfiddle.net/fusioncharts/m18qaekm/'
    },
    'ex4': {
        'html': '<div id=\'chart-container\'></div>',
        'jsfiddle': ''
    },
    'ex4a': {
        'html': '<div id=\'chart-container\'></div>',
        'jsfiddle': ''
    },
    'ex5': {
        'html': '<div id=\'chart-container\'></div>',
        'jsfiddle': 'http://jsfiddle.net/fusioncharts/bj0snLsg/'
    },
    'ex6': {
        'html': `<div id=\'chart-container\'></div>
<p>The value that you have selected is: <span id='value'>nothing</span></p>`,
        'jsfiddle': 'http://jsfiddle.net/fusioncharts/9ora4yc5/'
    },
    'ex7': {
        'html': '<div id=\'chart-container\'></div>',
        'jsfiddle': 'http://jsfiddle.net/fusioncharts/mqhk1nud/'
    },
    'ex8': {
        'html': `<p>Click on the slice of pie</p>
<div id='chart-container'></div>`,
        'jsfiddle': 'http://jsfiddle.net/fusioncharts/97s74d1q/'
    },
    'ex9': {
        'html': '<div id=\'chart-container\'></div>',
        'jsfiddle': 'http://jsfiddle.net/fusioncharts/asg7eqb0/'
    },
    'ex10': {
        'html': '<div id=\'map-container\'></div>',
        'jsfiddle': 'http://jsfiddle.net/fusioncharts/o0uze2Lv/'
    }
};

var previous = '';

var placementOfFiddleLinkey = function (exampleId) {
    if (code[exampleId].jsfiddle.length != 0) {
        $('#jsfiddle').html('Click <a id=\'jsfiddle_link\' href=\'\' target=\'_blank\'>here</a> for the JSFiddle');
        $('#jsfiddle #jsfiddle_link').attr('href',code[exampleId].jsfiddle);
    } else {
        $('#jsfiddle').html('');
    }
};

/*** Onload ***/
$('.navigation-tab').on('click', function() {
    var url = window.location.href
        , index = url.indexOf('/#')
        , id = $(this)[0].id;
    url = url.substr(index,url.length-index);
    if(id === 'home-navigate') {
        window.location.href = window.location.href.replace(url,'/#/home');
    } else if(id === 'getting-started-navigate') {
        window.location.href = window.location.href.replace(url,'/#/getting-started');
    } else if(id === 'dashboard-navigate') {
        window.location.href = window.location.href.replace(url,'/#/dashboard');
        document.getElementById('dashboard-container').innerHTML='<object type=\'text/html\' data=\'views/gtd-dashbaord-index.html\' ></object>';
    } else if(id === 'demos-navigate') {
        window.location.href = window.location.href.replace(url,'/#/demos/ex1');
        $('.examples#ex1').trigger('click');
    }
});


$('.examples').on('click',function() {
    var url = window.location.href
        , index = url.indexOf('demos/')
        , example = url.substr(index+6,(url.length - (index+6)))
        , exampleId = this.id;
    if(exampleId !== previous) {
        document.getElementById('charts-example').innerHTML='<object class=\'chart-space\' type=\'text/html\' data=\'views/' + exampleId + '.html\' ></object>';
    }

    placementOfFiddleLinkey(exampleId);

    jQuery.get({
        url: '../src/js/' + exampleId + '.js',
        // contentType: 'application/json',
        dataType: 'html',
        success: function (data) {
            data = '\n' + data.replace(/\</g, '&lt;');
            $('#javascript_code code.language-javascript').html(data);
            Prism.highlightAll();
        }
    });

    // jQuery.get({
    //     url: '../src/views/' + exampleId + '.html',
    //     // contentType: 'application/json',
    //     dataType: 'html',
    //     success: function (data) {
    //         data = '\n' + data.replace(/\</g, '&lt;');
    //         $('#html_code code.language-markup').html(data);
    //         Prism.highlightAll();
    //     }
    // });

    $('#html_code code.language-markup').html('\n' + code[exampleId].html.replace(/\</g, '&lt;'));
    // $('#html_code code.language-markup').html('\nHello world');
    // $('#javascript_code code.language-javascript').html(code[exampleId].javascript);

    previous = this.id;
    Prism.highlightAll();
});

if(window.location.href.indexOf('#') === -1) {
    window.location.href += '#/home';
} else {
    var url = window.location.href
        , index = url.indexOf('demos/')
        , example;
    if(url.indexOf('home/') !== -1) {
        $('.navigation-tab a[href=\'#home\']').tab('show');
    } else if(url.indexOf('/dashboard') !== -1) {
        $('.navigation-tab a[href=\'#dashboard\']').tab('show');
        document.getElementById('dashboard-container').innerHTML='<object type=\'text/html\' data=\'views/gtd-dashbaord-index.html\' ></object>';
    } else if(url.indexOf('/getting-started') !== -1) {
        $('.navigation-tab a[href=\'#getting-started\']').tab('show');
    } else if(index !== -1) {
        $('.navigation-tab a[href=\'#demos\']').tab('show');
        example = url.substr(index+6,(url.length - (index+6)));
        $('.examples#'+example).trigger('click');
    }
}
Prism.highlightAll();










$(document).ready(function() {

  $('#toc-list ul li').on('click', function(){
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
  });
  var url = $(location).attr('href');
  url = '#' + url.split('#').pop();
  $('#toc-list .list-group li.active').removeClass('active');
  
  $('a[href*=\'' + url + '\']').parent('li').addClass('active');

});

$(window).on('load', function() {
    $('.list-group').animate({
      scrollTop: $('.list-group li.active').position().top
    }, 1000);
});


