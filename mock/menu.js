module.exports = [
  {
    url: '/admin/menu/getmenu',
    type: 'get',
    response: config => {
      return {
        'code': 1,
        'msg': 'success',
        'data': [
          {
            'id': '2',
            'cate': '1',
            'path': '\/yunying',
            'component': 'Layout',
            'name': 'yunying',
            'meta': {
              'title': '运营管理',
              'icon': 'el-icon-user',
              'affix': false,
              'noCache': true,
              'breadcrumb': true
            },
            'always': false,
            'hidden': false,
            'children': [
              {
                'id': '13',
                'path': '\/statistics',
                'component': 'Layout',
                'name': '\/statistics',
                'meta': {
                  'title': '数据统计',
                  'icon': 'el-icon-s-data',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': false
                },
                'always': false,
                'hidden': false,
                'children': [
                  {
                    'id': '22',
                    'path': '\/statistics\/daily',
                    'component': 'statistics\/daily',
                    'name': 'statisticsdaily',
                    'meta': {
                      'title': '游戏日报',
                      'icon': 'el-icon-s-marketing',
                      'affix': false,
                      'noCache': false,
                      'breadcrumb': true
                    },
                    'always': false,
                    'hidden': false
                  }, {
                    'id': '23',
                    'path': '\/statistics\/ltv',
                    'component': 'statistics\/ltv',
                    'name': 'statisticsltv',
                    'meta': {
                      'title': 'LTV',
                      'icon': 'el-icon-s-operation',
                      'affix': false,
                      'noCache': false,
                      'breadcrumb': true
                    },
                    'always': false,
                    'hidden': false
                  }, {
                    'id': '58',
                    'path': '\/statistics\/regkeep',
                    'component': 'statistics\/regkeep',
                    'name': 'statisticsregkeep',
                    'meta': {
                      'title': '注册留存',
                      'icon': 'el-icon-data-board',
                      'affix': false,
                      'noCache': false,
                      'breadcrumb': true
                    },
                    'always': false,
                    'hidden': false
                  }, {
                    'id': '59',
                    'path': '\/statistics\/paykeep',
                    'component': 'statistics\/paykeep',
                    'name': 'statisticspaykeep',
                    'meta': {
                      'title': '付费留存',
                      'icon': 'el-icon-data-board',
                      'affix': false,
                      'noCache': false,
                      'breadcrumb': true
                    },
                    'always': false,
                    'hidden': false
                  }, {
                    'id': '57',
                    'path': '\/statistics\/all',
                    'component': 'statistics\/all',
                    'name': 'statisticsall',
                    'meta': {
                      'title': '综合数据',
                      'icon': 'el-icon-data-line',
                      'affix': false,
                      'noCache': false,
                      'breadcrumb': true
                    },
                    'always': false,
                    'hidden': false
                  }
                ]
              },
              {
                'id': '60',
                'path': '\/data',
                'component': 'Layout',
                'name': '\/data',
                'meta': {
                  'title': '数据管理',
                  'icon': 'el-icon-s-management',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': false
                },
                'always': false,
                'hidden': false,
                'children': [{
                  'id': '61',
                  'path': '\/reg\/index',
                  'component': 'reg\/index',
                  'name': 'regindex',
                  'meta': {
                    'title': '玩家列表',
                    'icon': 'el-icon-user-solid',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '62',
                  'path': '\/pay\/index',
                  'component': 'pay\/index',
                  'name': 'payindex',
                  'meta': {
                    'title': '充值列表',
                    'icon': 'money',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '63',
                  'path': '\/order\/index',
                  'component': 'order\/index',
                  'name': 'orderindex',
                  'meta': {
                    'title': '订单列表',
                    'icon': 'el-icon-s-order',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '74',
                  'path': '\/reg\/detail',
                  'component': 'reg\/detail',
                  'name': '\/reg\/detail',
                  'meta': {
                    'title': '玩家详情',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': true
                }, {
                  'id': '129',
                  'path': '\/user\/edit',
                  'component': 'user\/edit',
                  'name': 'useredit',
                  'meta': {
                    'title': '编辑玩家资料',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': false
                  },
                  'always': false,
                  'hidden': true
                }]
              }]
          }, {
            'id': '3',
            'cate': '1',
            'path': '\/guanggao',
            'component': 'Layout',
            'name': 'guanggao',
            'meta': {
              'title': '广告管理',
              'icon': 'el-icon-video-play',
              'affix': false,
              'noCache': true,
              'breadcrumb': true
            },
            'always': false,
            'hidden': false,
            'children': [{
              'id': '66',
              'path': '\/stati11',
              'component': 'Layout',
              'name': '\/stati11',
              'meta': {
                'title': '数据统计',
                'icon': 'el-icon-s-data',
                'affix': false,
                'noCache': true,
                'breadcrumb': false
              },
              'always': false,
              'hidden': false,
              'children': [{
                'id': '72',
                'path': '\/statistics\/roi',
                'component': 'statistics\/roi',
                'name': 'statisticsroi',
                'meta': {
                  'title': '流水ROI',
                  'icon': 'ROI',
                  'affix': false,
                  'noCache': false,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }, {
                'id': '73',
                'path': '\/statistics\/droi',
                'component': 'statistics\/droi',
                'name': 'statisticsdroi',
                'meta': {
                  'title': '分成后ROI',
                  'icon': 'el-icon-cold-drink',
                  'affix': false,
                  'noCache': false,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }]
            }]
          }, {
            'id': '1',
            'cate': '1',
            'path': '\/xitong',
            'component': 'Layout',
            'name': 'xitong',
            'meta': {
              'title': '系统管理',
              'icon': 'el-icon-setting',
              'affix': false,
              'noCache': true,
              'breadcrumb': true
            },
            'always': false,
            'hidden': false,
            'children': [{
              'id': '8',
              'path': '\/basicdata',
              'component': 'Layout',
              'name': 'basicdata',
              'meta': {
                'title': '基础数据管理',
                'icon': 'el-icon-notebook-2',
                'affix': false,
                'noCache': true,
                'breadcrumb': false
              },
              'always': false,
              'hidden': false,
              'children': [{
                'id': '9',
                'cate': '1',
                'path': '\/package',
                'component': 'RouterView',
                'name': 'package',
                'meta': {
                  'title': '包管理',
                  'icon': 'el-icon-eleme',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': false
                },
                'always': false,
                'hidden': false,
                'children': [{
                  'id': '10',
                  'path': '\/package\/index',
                  'component': 'package\/index',
                  'name': 'packageindex',
                  'meta': {
                    'title': '列表',
                    'fulltitle': '包管理列表',
                    'icon': 'el-icon-c-scale-to-original',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '11',
                  'path': '\/package\/add',
                  'component': 'package\/add',
                  'name': 'packageadd',
                  'meta': {
                    'title': '添加',
                    'fulltitle': '添加包',
                    'icon': 'el-icon-plus',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '12',
                  'path': '\/package\/edit',
                  'component': 'package\/edit',
                  'name': 'packageedit',
                  'meta': {
                    'title': '编辑',
                    'fulltitle': '编辑包',
                    'icon': 'el-icon-edit-outline',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': false
                  },
                  'always': false,
                  'hidden': true
                }, {
                  'id': '34',
                  'path': '\/package\/del',
                  'component': 'package\/del',
                  'name': '\/package\/del',
                  'meta': {
                    'title': '删除',
                    'fulltitle': '删除包',
                    'icon': 'el-icon-delete',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': true
                }]
              }, {
                'id': '14',
                'path': '\/game',
                'component': 'RouterView',
                'name': '\/game',
                'meta': {
                  'title': '游戏管理',
                  'icon': 'el-icon-basketball',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': false
                },
                'always': false,
                'hidden': false,
                'children': [{
                  'id': '15',
                  'path': '\/game\/index',
                  'component': 'game\/index',
                  'name': 'gameindex',
                  'meta': {
                    'title': '列表',
                    'fulltitle': '游戏列表',
                    'icon': 'el-icon-c-scale-to-original',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '16',
                  'path': '\/game\/add',
                  'component': 'game\/add',
                  'name': 'gameadd',
                  'meta': {
                    'title': '添加',
                    'fulltitle': '添加游戏',
                    'icon': 'el-icon-plus',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '17',
                  'path': '\/game\/edit',
                  'component': 'game\/edit',
                  'name': '\/game\/edit',
                  'meta': {
                    'title': '编辑',
                    'fulltitle': '编辑游戏',
                    'icon': 'el-icon-edit-outline',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': true
                }, {
                  'id': '35',
                  'path': '\/game\/del',
                  'component': 'game\/del',
                  'name': '\/game\/del',
                  'meta': {
                    'title': '删除',
                    'fulltitle': '删除游戏',
                    'icon': 'el-icon-delete',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': true
                }]
              }]
            }, {
              'id': '24',
              'path': '\/admin',
              'component': 'Layout',
              'name': '\/admin',
              'meta': {
                'title': '后台角色管理',
                'icon': 'el-icon-user',
                'affix': false,
                'noCache': true,
                'breadcrumb': false
              },
              'always': false,
              'hidden': false,
              'children': [{
                'id': '25',
                'path': '\/admin\/data',
                'component': 'RouterView',
                'name': '\/admin\/data',
                'meta': {
                  'title': '管理员',
                  'icon': 'el-icon-user-solid',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': false
                },
                'always': false,
                'hidden': false,
                'children': [{
                  'id': '26',
                  'path': '\/admin\/index',
                  'component': 'admin\/index',
                  'name': 'adminindex',
                  'meta': {
                    'title': '列表',
                    'fulltitle': '管理员列表',
                    'icon': 'el-icon-c-scale-to-original',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '27',
                  'path': '\/admin\/add',
                  'component': 'admin\/add',
                  'name': 'adminadd',
                  'meta': {
                    'title': '添加',
                    'fulltitle': '添加管理员',
                    'icon': 'el-icon-plus',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '28',
                  'path': '\/admin\/edit',
                  'component': 'admin\/edit',
                  'name': '\/admin\/edit',
                  'meta': {
                    'title': '编辑',
                    'fulltitle': '编辑管理员',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': true
                }, {
                  'id': '37',
                  'path': '\/admin\/del',
                  'component': 'admin\/del',
                  'name': '\/admin\/del',
                  'meta': {
                    'title': '删除',
                    'fulltitle': '删除管理员',
                    'icon': 'el-icon-delete',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': true
                }]
              }, {
                'id': '29',
                'path': '\/admin\/modify',
                'component': 'admin\/modify',
                'name': '\/admin\/modify',
                'meta': {
                  'title': '修改我的资料',
                  'fulltitle': '修改我的资料',
                  'icon': 'el-icon-edit',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }, {
                'id': '30',
                'path': '\/role',
                'component': 'RouterView',
                'name': '\/role',
                'meta': {
                  'title': '角色',
                  'icon': 'el-icon-female',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': false
                },
                'always': false,
                'hidden': false,
                'children': [{
                  'id': '31',
                  'path': '\/role\/index',
                  'component': 'role\/index',
                  'name': 'roleindex',
                  'meta': {
                    'title': '列表',
                    'fulltitle': '角色列表',
                    'icon': 'el-icon-c-scale-to-original',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '32',
                  'path': '\/role\/add',
                  'component': 'role\/add',
                  'name': 'roleadd',
                  'meta': {
                    'title': '添加',
                    'fulltitle': '添加角色',
                    'icon': 'el-icon-plus',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '33',
                  'path': '\/role\/edit',
                  'component': 'role\/edit',
                  'name': '\/role\/edit',
                  'meta': {
                    'title': '编辑',
                    'fulltitle': '编辑角色',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': true
                }, {
                  'id': '38',
                  'path': '\/role\/del',
                  'component': 'role\/del',
                  'name': '\/role\/del',
                  'meta': {
                    'title': '删除',
                    'fulltitle': '删除角色',
                    'icon': 'el-icon-delete',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': true
                }]
              }, {
                'id': '141',
                'path': '\/adminLog\/index',
                'component': 'adminLog\/index',
                'name': 'adminlogindex',
                'meta': {
                  'title': '后台登录记录',
                  'icon': 'el-icon-set-up',
                  'affix': false,
                  'noCache': false,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }, {
                'id': '142',
                'path': '\/log\/index',
                'component': 'log\/index',
                'name': 'logindex',
                'meta': {
                  'title': '后台操作记录',
                  'icon': 'el-icon-s-check',
                  'affix': false,
                  'noCache': false,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }]
            }, {
              'id': '40',
              'path': '\/crontab',
              'component': 'Layout',
              'name': '\/crontab',
              'meta': {
                'title': 'cron管理',
                'icon': 'el-icon-alarm-clock',
                'affix': false,
                'noCache': true,
                'breadcrumb': false
              },
              'always': false,
              'hidden': false,
              'children': [{
                'id': '41',
                'path': '\/crontab\/index',
                'component': 'crontab\/index',
                'name': 'crontabindex',
                'meta': {
                  'title': '列表',
                  'fulltitle': 'cron列表',
                  'icon': 'el-icon-c-scale-to-original',
                  'affix': false,
                  'noCache': false,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }, {
                'id': '42',
                'path': '\/crontab\/add',
                'component': 'crontab\/add',
                'name': 'crontabadd',
                'meta': {
                  'title': '添加',
                  'fulltitle': '添加cron',
                  'icon': 'el-icon-plus',
                  'affix': false,
                  'noCache': false,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }, {
                'id': '43',
                'path': '\/crontab\/edit',
                'component': 'crontab\/edit',
                'name': '\/crontab\/edit',
                'meta': {
                  'title': '编辑',
                  'fulltitle': '编辑cron',
                  'icon': 'el-icon-edit',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': true
              }, {
                'id': '44',
                'path': '\/crontab\/del',
                'component': 'crontab\/del',
                'name': '\/crontab\/del',
                'meta': {
                  'title': '删除',
                  'fulltitle': '删除cron',
                  'icon': 'el-icon-delete',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': true
              }]
            }, {
              'id': '45',
              'path': '\/backconfig',
              'component': 'Layout',
              'name': '\/backconfig',
              'meta': {
                'title': '网站配置管理',
                'icon': 'el-icon-s-tools',
                'affix': false,
                'noCache': true,
                'breadcrumb': false
              },
              'always': false,
              'hidden': false,
              'children': [{
                'id': '46',
                'path': '\/sysinfo',
                'component': 'RouterView',
                'name': '\/sysinfo',
                'meta': {
                  'title': '网站配置',
                  'icon': 'el-icon-s-tools',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': false
                },
                'always': false,
                'hidden': false,
                'children': [{
                  'id': '47',
                  'path': '\/sysinfo\/index',
                  'component': 'sysinfo\/index',
                  'name': 'sysinfoindex',
                  'meta': {
                    'title': '列表',
                    'fulltitle': '网站配置列表',
                    'icon': 'el-icon-c-scale-to-original',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '48',
                  'path': '\/sysinfo\/add',
                  'component': 'sysinfo\/add',
                  'name': 'sysinfoadd',
                  'meta': {
                    'title': '添加',
                    'fulltitle': '添加网站配置',
                    'icon': 'el-icon-plus',
                    'affix': false,
                    'noCache': false,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': false
                }, {
                  'id': '49',
                  'path': '\/sysinfo\/edit',
                  'component': 'sysinfo\/edit',
                  'name': '\/sysinfo\/edit',
                  'meta': {
                    'title': '编辑',
                    'fulltitle': '编辑网站配置',
                    'icon': 'el-icon-edit',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': true
                }, {
                  'id': '50',
                  'path': '\/sysinfo\/del',
                  'component': 'sysinfo\/del',
                  'name': '\/sysinfo\/del',
                  'meta': {
                    'title': '删除',
                    'fulltitle': '删除网站配置',
                    'icon': 'el-icon-delete',
                    'affix': false,
                    'noCache': true,
                    'breadcrumb': true
                  },
                  'always': false,
                  'hidden': true
                }]
              }, {
                'id': '137',
                'path': '\/cerror\/index',
                'component': 'cerror\/index',
                'name': 'cerror',
                'meta': {
                  'title': '后台错误日志',
                  'icon': 'bug',
                  'affix': false,
                  'noCache': false,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }]
            }, {
              'id': '138',
              'path': '\/phpmyadmin',
              'component': 'Layout',
              'name': 'phpmyadmin',
              'meta': {
                'title': 'phpMyAdmin',
                'icon': 'phpmyadmin2',
                'affix': false,
                'noCache': false,
                'breadcrumb': true
              },
              'always': false,
              'hidden': false,
              'children': [{
                'id': '140',
                'path': '\/phpmyadmin\/index',
                'component': 'phpmyadmin\/index',
                'name': 'phpmyadminindex',
                'meta': {
                  'title': 'phpMyAdmin',
                  'affix': false,
                  'noCache': false,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }]
            }, {
              'id': '4',
              'cate': '1',
              'path': '\/menu',
              'component': 'Layout',
              'name': 'caidan',
              'meta': {
                'title': '菜单管理',
                'icon': 'el-icon-menu',
                'affix': false,
                'noCache': true,
                'breadcrumb': false
              },
              'always': false,
              'hidden': false,
              'children': [{
                'id': '7',
                'path': '\/menu\/edit',
                'component': 'menu\/edit',
                'name': 'editmenu',
                'meta': {
                  'title': '编辑',
                  'fulltitle': '编辑菜单',
                  'icon': 'el-icon-edit-outline',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': true
              }, {
                'id': '5',
                'path': '\/menu\/index',
                'component': 'menu\/index',
                'name': 'menuindex',
                'meta': {
                  'title': '列表',
                  'fulltitle': '菜单列表',
                  'icon': 'el-icon-c-scale-to-original',
                  'affix': false,
                  'noCache': false,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }, {
                'id': '6',
                'path': '\/menu\/add',
                'component': 'menu\/add',
                'name': 'menuadd',
                'meta': {
                  'title': '添加',
                  'fulltitle': '添加菜单',
                  'icon': 'el-icon-plus',
                  'affix': false,
                  'noCache': false,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': false
              }, {
                'id': '39',
                'path': '\/menu\/del',
                'component': 'menu\/del',
                'name': '\/menu\/del',
                'meta': {
                  'title': '删除',
                  'fulltitle': '删除菜单',
                  'icon': 'el-icon-delete',
                  'affix': false,
                  'noCache': true,
                  'breadcrumb': true
                },
                'always': false,
                'hidden': true
              }]
            }]
          }
        ]
      }
    }
  }
]
