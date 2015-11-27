//= require jquery
//= require sjcl

var encrypted_data = '{"iv":"YEziXz37bLKwoazUMbiBRQ","v":1,"iter":1000,"ks":128,"ts":64,"mode":"ccm","adata":"","cipher":"aes","salt":"a35GjIvvnzI","ct":"5aGiS1W4/DhSmPWajJvb/p+8GWnoWjMrs00y2pr+0Z4+Aw2P8rngfRC1DgYHWmib9FS5aPVbh9utiTwJkYNfVONvXJcMrXzgNBRCYXP5P+bG8wzbQhSUpad6tT6O5jDmDKtqgyo2OLF4L3aE39m9BBaBvdIqc2u5GBzhR6JzxGDhOTy6uzGwidOFnkJRFgcRO5rm2ou4HUAleAOdLn0sKP2MNyT8qsI6sxzbQf22J+yRlg8HdVMOkoO7kLIjx1wzMudRP7mpjjcpqcGBygY5s6qb7CozkvdQ3+sD9c28cd1XKU1LdEftw3ET4zqc+QXjFIzJQViwrnpVMbVfrT1qjcwrC60V9QZobMvzX6IGcjzT17ypmeYpAS3eZ3pY+VbbyIbE9a2GB/k2u/U"}';

$.urlParam = function(name) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == name) {
			return sParameterName[1];
		};
	};
};

$(document).ready(function () {
	var passcode = $.urlParam('passcode');
	if (passcode) {
		try {
			var data = sjcl.json.decrypt(passcode, encrypted_data);
			$('#contact-info').replaceWith(data);
		} catch(e) {
			console.log("Decryption failed: " + e);
		};
	};
});