export default class formatTest {
	constructor(ele, reg, empty) {
		this.ele = ele
		this.reg = reg
		this.empty = empty //是否允许为空
	}
	testFormat() {
		// ip段
		var IPReg_piece = /^(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
		//mac段
		var MacReg_piece = /^[0-9A-Fa-f]{2}$/
		//正常ip
		var IPReg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
		//正常mac
		var MacReg = /^[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}$/

		switch(this.reg) {
			case 'ip':
				_reg = IPReg
				break;
			case 'ip_piece':
				_reg = IPReg_piece
				break;
			case 'mac':
				_reg = MacReg
				break;
			case 'mac_piece':
				_reg = MacReg_piece
				break;	
			default:
				break;
		}
		var val = $(this.ele).val().trim()
		if(this.empty) {
			//可以为空
			if(!_reg.test(val) && val) {
				this.worng()
				return false
			} else {
				this.right()
				return true

			}
		} else {
            if(!_reg.test(val)) {
				this.worng()
				return false
			} else {
				this.right()
				return true

			}
		}

	}
	right() {
		$(this.ele).parent().find('.mi').css('color', '#d2d2d2')
		if(this.reg=='mac_piece'||this.reg=='ip_piece'){
			$(this.ele).css('border', 'none')
		}else{
			$(this.ele).css('border', '1px solid #e8e8e8')
		}
		
	}
	worng() {		
		$(this.ele).css('border', '1px solid #b63039')
		$(this.ele).addClass('animated shake')
		var _this = this
		setTimeout(function() {
			$(_this.ele).removeClass('animated shake')
		}, 200)
	}
    isEmpty() {
		var val = $(this.ele).val()
		if(val) {
			$(this.ele).parent().find('.mi').css('color', '#d2d2d2')
			$(this.ele).css('border', '1px solid #e8e8e8')
		}
	}
	notEmpty() {
		$(this.ele).parent().find('.mi').css('color', '#d2d2d2')
		$(this.ele).css('border', '1px solid #e8e8e8')
	}
}