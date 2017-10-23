var data = {
    //link:'http://toupiao.snimay.com/index.php/',
    //imgLink:'http://toupiao.snimay.com/public',
    link:'http://127.0.0.1/snimay/',
    imgLink:'http://127.0.0.1/snimay/public',
    token:'',
    hasClick:true,
    adding:[],
};
var all = new Vue({
    el:'#vueMain',
    data:data,
    created:function() {
        var $this=this;
        $('#file_upload').on('click',function(){
            $this.uploads('#file_upload',function(res){
                $("#add1").hide();
                $("#upic").attr('src',$this.imgLink+res.thumb.pic);
                $("#user_pics").attr('value',res.thumb.pic_s);
                $("#user_pic").attr('value',res.thumb.pic);
            });
        });

        $('#file_upload_b').on('click',function(){
            $this.uploads('#file_upload_b',function(res){
                $("#add2").hide();
                $("#teamPic").attr('src',$this.imgLink+res.thumb.pic);
                $("#team_pics").attr('value',res.thumb.pic_s);
                $("#team_pic").attr('value',res.thumb.pic);
            });
        });
        $('#file_upload_c').on('click',function(){
            $this.uploads('#file_upload_c',function(res){
                $("#add3").hide();
                $("#sell_c").attr('src',$this.imgLink+res.thumb.pic);
                $this.adding.push(res.thumb);
                //$("#sell_pics_c").attr('value',res.thumb.pic_s);
                //$("#sell_pic_c").attr('value',res.thumb.pic);
            });
        });
        $('#file_upload_d').on('click',function(){
            $this.uploads('#file_upload_d',function(res){
                $("#add4").hide();
                $("#sell_d").attr('src',$this.imgLink+res.thumb.pic);
                $this.adding.push(res.thumb);
                //$("#sell_pics_d").attr('value',res.thumb.pic_s);
                //$("#sell_pic_d").attr('value',res.thumb.pic);
            });
        });
        $('#file_upload_e').on('click',function(){
            $this.uploads('#file_upload_e',function(res){
                $("#add5").hide();
                $("#sell_e").attr('src',$this.imgLink+res.thumb.pic);
                $this.adding.push(res.thumb);
                //$("#sell_pics_e").attr('value',res.thumb.pic_s);
                //$("#sell_pic_e").attr('value',res.thumb.pic);
            });
        });

    },
    methods: {
        AjaxL: function (url, type, data, call) {
            var $this = this;
            $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: 'JSON',
                success: function (res) {
                    call(res);
                    if (res.token) {
                        $this.token = res.token;
                    }
                    if (res.url) {
                        window.location.href = res.url;
                    }
                },
            })
        },
        uploads:function(box,cal){
            var $this=this;
            layui.use('upload', function(){
                var upload = layui.upload;
                var uploadInst = upload.render({
                    elem: box //绑定元素
                    ,data:{"__token__":$this.token}
                    ,accept:"images"
                    ,size:3072
                    ,url: $this.link+"upload" //上传接口
                    ,before:function(){
                        index=layer.load(1);
                    }
                    ,done: function(res){
                        layer.closeAll();
                        $this.token=res.token;
                        if(res.code == 1){
                            cal(res);
                        }else{
                            layer.msg(res.msg);
                        }
                    }
                    ,error: function(){
                        layer.closeAll();
                    }
                });
            });
        },
        add_shop:function(){
            $("#shop").attr("disabled","disabled");
            var $this=this;
            var sell_name = $("#shop_sell").val();
            var username = $("#shop_name").val();
            var phone = $("#shop_phone").val();
            var complete = $("#shop_complete").val();
            var desc = "大家好,我是"+sell_name+"诗尼曼店长"+username+"；今年年度销售目标完成率"+complete+"%；争做2017诗尼曼“年度十优”榜样，我相信我能行！";
            var user_pic = $("#user_pic").val();
            var user_pics = $("#user_pics").val();
            var team_pics = $("#team_pics").val();
            var team_pic = $("#team_pic").val();
            var space_link = $("#space_link").val();
            var sell = $this.adding;
            var sell_pic = '';
            var sell_pics = '';
            for(var i = 0;i < sell.length; i++) {
                sell_pic += sell[i]['pic']+';';
                sell_pics += sell[i]['pic_s']+';';
            }

            var index=layer.load(1);
            $this.AjaxL($this.link+'addShops','POST',{
                "sell_name":sell_name,
                "username":username,
                "phone":phone,
                "user_pic":user_pic,
                "team_pic":team_pic,
                "sell_pic":sell_pic,
                "desc":desc,
                "complete":complete,
                "user_pics":user_pics,
                "team_pics":team_pics,
                "sell_pics":sell_pics,
                "space_link":space_link,
                "__token__":$this.token
            },function(res){
                layer.close(index);
                if(res.code == 1){
                    layer.msg(res.msg);
                }else{
                    $("#shop").removeAttr("disabled");
                    layer.msg(res.msg);
                }
            });
        },
    }
});