INPUT.devices.gamepad = {};

INPUT.devices.gamepad.GAMEPAD_ANALOGUE_THRESHOLD = 0.5;

INPUT.devices.gamepad.map = {
		button: {
			'1': 0,
			'2': 1,
			'3': 2,
			'4': 3,
			'L1': 4,
			'R1': 5,
			'L2': 6,
			'R2': 7,
			'select': 8,
			'start': 9,
			'leftanalogue': 10,
			'rightanalogue': 11,
			'padup': 12,
			'paddown': 13,
			'padleft': 14,
			'padright': 15
		},
		axis: {
			'leftanaloguehor': 0,
			'leftanaloguevert': 1,
			'rightanaloguehor': 2,
			'rightanaloguevert': 3
		}
};

INPUT.devices.gamepad.isMine = function(name) {
	return name.substr(0,7) == "gamepad";
};

INPUT.devices.gamepad.getCodes = function(name) {};

INPUT.devices.gamepad.isPressed = function(name) {
	var gpdesc = this.getGamepadButtonDescription(name),
		gptype = (gpdesc.type == "axis")? "axes" : "buttons",
		gamepads = this.getGamepads();
	return gamepads[gpdesc.gamepad] && Math.abs(gamepads[gpdesc.gamepad][gptype][gpdesc.num]) > this.GAMEPAD_ANALOGUE_THRESHOLD;
};

INPUT.devices.gamepad.getGamepads = function() {
	return navigator.getGamepads && navigator.getGamepads()
		|| navigator.webkitGetGamepads && navigator.webkitGetGamepads()
		|| navigator.webkitGamepads;
	
};

INPUT.devices.gamepad.getAxis = function(name) {
	var gpdesc = this.getGamepadButtonDescription(name);
	if(this.getGamepads()[gpdesc.gamepad])
		return this.getGamepads()[gpdesc.gamepad].axes[gpdesc.num];
	else
		return 0;
};

INPUT.devices.gamepad.getGamepadButtonDescription = function(name) {
	var gpcode = name.split("/");
	var gpnum = parseInt(gpcode[0].substr(7))-1;
	var gptype, gpbutton;
	if(gpcode.length == 2) {
		gptype = (typeof this.map.button[gpcode[1]] != "undefined")? "button" : "axis";
		gpbutton = this.map[gptype][gpcode[1]];
	} else {
		gptype = gpcode[1];
		gpbutton = parseInt(gpcode[2])-1;
	}
	
	return {
		gamepad: gpnum,
		type: gptype,
		num: gpbutton
	};
};
