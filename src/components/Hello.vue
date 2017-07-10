<template>
  <div class="wrap">
    <span class="copyText"></span>
    <div class="inputs">
      <label for="">MAC :&nbsp; </label>
       <div class="input_outline">  
           <li v-for='index in length' >
              <input  maxlength="2" @paste="copy($event)" @focus="notEmpty($event)" @keyup="nextPrevUp($event)" @keydown="nextPrevDown($event)"
              @blur="testFormat($event,'mac_piece',false)" :class="'mac_' +index" type="text">{{index!=length?":":''}}
            </li>         
           
        </div>
    </div>
    
    <p>可复制的文本：12:12:12:12:12:12</p>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        length:6
      }
    },
    mounted() {
      $('body').on('copy', function () {
        $('.copyText').html(window.getSelection().toString())
      })
    },
    methods: {
      copy(event) {//拷贝自动填充
        event.preventDefault()
        let content = $('.copyText').html()
        if (content.indexOf(':') > 0) {
          var copytext = content.split(':')       
        }
        for (let i=0 ; i< 6 ; i++) {
          $('.mac_' +(i+1)).val(copytext[i])
        }
      },
      nextPrevUp(event) {
        if ($(event.currentTarget).val().length > 1 && event.keyCode != 37 && event.keyCode != 8) {//长度超过两个自动下一个
          event.preventDefault()
          $(event.currentTarget).parent().next().find('input').focus()
        }
        if ($(event.currentTarget).val().length <= 0 && event.keyCode == 8) {//backspace为空时自动上一个
          event.preventDefault()
          $(event.currentTarget).parent().prev().find('input').focus()
        }

      },
      nextPrevDown(event) {
        if (event.keyCode == 39) {//右键自动下一个
          event.preventDefault()
          $(event.currentTarget).parent().next().find('input').focus()
        }
        if (event.keyCode == 37) {//左键自动上一个
          event.preventDefault()
          $(event.currentTarget).parent().prev().find('input').focus()
        }

      },
      testFormat(event, reg, empty) {
        let ele = event.currentTarget
        var reg = /^[0-9A-Fa-f]{2}$/
        var val = $(ele).val().trim()
        if (!reg.test(val)) {
          $(ele).addClass('animated shake')
          setTimeout(function () {
            $(ele).removeClass('animated shake')
          }, 200)
          return false
        } else {
          $(ele).css('border', 'none')
          return true
        }
        if (result) {
          $(ele).css("border", 'none')
        }
        return result
      },
      notEmpty: function (event) {
        let ele = event.currentTarget
        $(ele).css('border', 'none')
      }
    }
  }
</script>
<style scoped>
  .wrap{
    text-align: center;
  }
  li{
    list-style: none;
  }
  .inputs{
    display: flex;
    justify-content: center;
  }
  label{
     color: #555;
     vertical-align: middle;
  }
  input{
		width: 32px;
    height: 20px;
		text-align: center;
    color: #555;
   	border: none;
	}
	.input_outline{
    display: flex;
    width: 215px;
    align-items: center;	
		border: 1px solid  #e8e8e8;
		border-radius: 3px;
		box-sizing: border-box;
    color: #999;
    padding: 0;
	}
  .copyText{
    display: none;
  }
</style>