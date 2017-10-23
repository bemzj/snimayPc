var data = {
    //link:'http://toupiao.snimay.com/index.php/',
    //imgLink:'http://toupiao.snimay.com/public',
    link:'http://127.0.0.1/snimay/',
    imgLink:'http://127.0.0.1/snimay/public',
    token:'',
    hasClick:true,
    adding:[],
    reals:[],
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

        $('#file_upload_c').on('click',function(){
            $this.uploads('#file_upload_c',function(res){
                $("#add3").hide();
                $("#sell_c").attr('src',$this.imgLink+res.thumb.pic);
                $this.adding.push(res.thumb);
            });
        });
        $('#file_upload_d').on('click',function(){
            $this.uploads('#file_upload_d',function(res){
                $("#add4").hide();
                $("#sell_d").attr('src',$this.imgLink+res.thumb.pic);
                $this.adding.push(res.thumb);
            });
        });
        $('#file_upload_e').on('click',function(){
            $this.uploads('#file_upload_e',function(res){
                $("#add5").hide();
                $("#sell_e").attr('src',$this.imgLink+res.thumb.pic);
                $this.adding.push(res.thumb);
            });
        });

        $('#file_upload_f').on('click',function(){
            $this.uploads('#file_upload_f',function(res){
                $("#add6").hide();
                $("#sell_f").attr('src',$this.imgLink+res.thumb.pic);
                $this.reals.push(res.thumb);
            });
        });
        $('#file_upload_g').on('click',function(){
            $this.uploads('#file_upload_g',function(res){
                $("#add7").hide();
                $("#sell_g").attr('src',$this.imgLink+res.thumb.pic);
                $this.reals.push(res.thumb);
            });
        });
        $('#file_upload_h').on('click',function(){
            $this.uploads('#file_upload_h',function(res){
                $("#add8").hide();
                $("#sell_h").attr('src',$this.imgLink+res.thumb.pic);
                $this.reals.push(res.thumb);
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
        add_design:function(){
            $("#des").attr("disabled","disabled");
            var $this=this;
            var sell_name = $("#des_sell").val();
            var username = $("#des_name").val();
            var phone = $("#des_phone").val();
            var user_pic = $("#user_pic").val();
            var user_pics = $("#user_pics").val();
            var works = $("#des_work").val();
            var money = $("#des_money").val();
            var desc = "大家好,我是"+sell_name+"诗尼曼设计师"+username+"，今年累计设计作品"+works+"个，总签单金额"+money+",争做2017诗尼曼“年度十优”榜样，我相信我能行！";
            var space_pic = $("#space_pic").val();

            var real = $this.reals;
            var real_pic = '';
            var real_pics = '';
            for(var i = 0;i < real.length; i++) {
                real_pic += real[i]['pic']+';';
                real_pics += real[i]['pic_s']+';';
            }
            var effect = $this.adding;
            var effect_pic = '';
            var effect_pics = '';
            for(var i = 0;i < effect.length; i++) {
                effect_pic += effect[i]['pic']+';';
                effect_pics += effect[i]['pic_s']+';';
            }
            var index=layer.load(1);
            $this.AjaxL($this.link+'addDesigns','POST',{
                "sell_name":sell_name,
                "username":username,
                "phone":phone,
                "user_pic":user_pic,
                "user_pics":user_pics,
                "works":works,
                "money":money,
                "desc":desc,
                "real_pic":real_pic,
                "real_pics":real_pics,
                "effect_pic":effect_pic,
                "effect_pics":effect_pics,
                "space_pic":space_pic,
                "__token__":$this.token
            },function(res){
                layer.close(index);
                if(res.code == 1){
                    layer.msg(res.msg);
                }else{
                    $("#des").removeAttr("disabled");
                    layer.msg(res.msg);
                }
            });
        },
    }
});