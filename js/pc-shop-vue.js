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
        $this.AjaxL($this.link+'hasAuths','GET',false,function(res){
            $this.token=res.token;
        });
        layui.use('layer', function(){
            var layer=layui.layer;
        });
        $('#file_upload').on('click',function(){
            //$this.uploads('#file_upload',function(res){
            //    $("#add1").hide();
            //    $("#upic").attr('src',$this.imgLink+res.thumb.pic);
            //    $("#user_pics").attr('value',res.thumb.pic_s);
            //    $("#user_pic").attr('value',res.thumb.pic);
            //});
            $this.upBase('file_upload',function(res){
                $("#add1").hide();
                $("#upic").attr('src',res);
                //$("#user_pics").attr('value',res.substr(22));
                $("#user_pic").attr('value',res.substr(22));
            });
        });

        $('#file_upload_b').on('click',function(){
            //$this.uploads('#file_upload_b',function(res){
            //    $("#add2").hide();
            //    $("#teamPic").attr('src',$this.imgLink+res.thumb.pic);
            //    $("#team_pics").attr('value',res.thumb.pic_s);
            //    $("#team_pic").attr('value',res.thumb.pic);
            //});
            $this.upBase('file_upload_b',function(res){
                $("#add2").hide();
                $("#teamPic").attr('src',res);
                //$("#team_pics").attr('value',res.substr(22));
                $("#team_pic").attr('value',res.substr(22));
            });
        });
        $('#file_upload_c').on('click',function(){
            //$this.uploads('#file_upload_c',function(res){
            //    $("#add3").hide();
            //    $("#sell_c").attr('src',$this.imgLink+res.thumb.pic);
            //    $this.adding.push(res.thumb);
            //    //$("#sell_pics_c").attr('value',res.thumb.pic_s);
            //    //$("#sell_pic_c").attr('value',res.thumb.pic);
            //});
            $this.upBase('file_upload_c',function(res){
                $("#add3").hide();
                $("#sell_c").attr('src',res);
                $this.adding.push(res.substr(22));
            });
        });
        $('#file_upload_d').on('click',function(){
            //$this.uploads('#file_upload_d',function(res){
            //    $("#add4").hide();
            //    $("#sell_d").attr('src',$this.imgLink+res.thumb.pic);
            //    $this.adding.push(res.thumb);
            //    //$("#sell_pics_d").attr('value',res.thumb.pic_s);
            //    //$("#sell_pic_d").attr('value',res.thumb.pic);
            //});
            $this.upBase('file_upload_d',function(res){
                $("#add4").hide();
                $("#sell_d").attr('src',res);
                $this.adding.push(res.substr(22));
            });
        });
        $('#file_upload_e').on('click',function(){
            //$this.uploads('#file_upload_e',function(res){
            //    $("#add5").hide();
            //    $("#sell_e").attr('src',$this.imgLink+res.thumb.pic);
            //    $this.adding.push(res.thumb);
            //    //$("#sell_pics_e").attr('value',res.thumb.pic_s);
            //    //$("#sell_pic_e").attr('value',res.thumb.pic);
            //});
            $this.upBase('file_upload_e',function(res){
                $("#add5").hide();
                $("#sell_e").attr('src',res);
                $this.adding.push(res.substr(22));
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
        upBase:function(id,call){
            var $this=this;
            var _upFile=document.getElementById(id);
            index=layer.load(1);
            _upFile.addEventListener("change",function(){
                if (_upFile.files.length === 0) {
                    alert("请选择图片");
                    return; }
                var oFile = _upFile.files[0];
                //if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return; }

                /*  if(oFile.size>5*1024*1024){
                 message(myCache.par.lang,{cn:"照片上传：文件不能超过5MB!请使用容量更小的照片。",en:"证书上传：文件不能超过100K!"})
                 return;
                 }*/
                if(!new RegExp("(jpg|jpeg|png)+","gi").test(oFile.type)){
                    alert("照片上传：文件类型必须是JPG、JPEG、PNG");
                    return;
                }
                //layer.load(2);
                var reader = new FileReader();
                reader.onload = function(e) {
                    var base64Img= e.target.result;
                    //压缩前预览
                    //--执行resize。
                    var _ir=ImageResizer({
                        resizeMode:"auto"
                        ,dataSource:base64Img
                        ,dataSourceType:"base64"
                        ,maxWidth:714 //允许的最大宽度
                        ,maxHeight:1334 //允许的最大高度。
                        ,onTmpImgGenerate:function(img){
                        }
                        ,success:function(resizeImgBase64,canvas){
                            layer.closeAll();
                            call(resizeImgBase64);
                            //赋值到隐藏域传给后台
                            // $('#imgOne').val(resizeImgBase64.substr(22));
                        }
                        ,debug:true
                    });

                };
                layer.closeAll();
                reader.readAsDataURL(oFile);
            },false);
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
            var team_pic = $("#team_pic").val();
            var space_link = $("#space_link").val();
            var sell_pic = $this.adding;
            //var sell_pic = '';
            //var sell_pics = '';
            //for(var i = 0;i < sell.length; i++) {
            //    sell_pic += sell[i]['pic']+';';
            //    sell_pics += sell[i]['pic_s']+';';
            //}

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
                "space_link":space_link,
                "__token__":$this.token
            },function(res){
                layer.close(index);
                if(res.code == 1){
                    layer.msg(res.msg);
                    $("#wechat").show();
                }else{
                    $("#shop").removeAttr("disabled");
                    layer.msg(res.msg);
                }
            });
        },
    }
});