/**
 * Nirvash is a library that constructs `piper` compatible requests
 * and serializes them for wire transport.
 */
module.exports = (function() {
	var me = {};

	/**
	 * Registers a user w/ the nirvash server; performing NO AUTHENTICATION.
	 */
	me.registerUser = function(username) {
		var uri    = "/self/registration";
		var method = "Put";
		var val    = { name: username }; // struct RUser { name:string }

		return { Resource: { method: method,  path: uri, payload: JSON.stringify(val) } }
	};

	/**
	 * Addresses a message to be broadcast to an entire room
	 */
	me.targetRoom = function(room_name) {
		return { RoomByName: { name: room_name } };
	};

	/**
	 * Tags a user with a given key-value pair.
	 * [destination:Target, key: String, tag:String]
	 */
	me.tagUser = function(uid, room_name, key, val) {
		// /rooms/{name}/{uid}/tag/{key}/{val}
		var uri = '/rooms/' + room_name + '/' + uid + '/tag/' + key;
		var method = "Publish";

		return { Resource: { method: method, path: uri, payload: JSON.stringify(val) } };
	};

	/**
	 * Sends a message to the room.
	 *
	 * The username is required; however it is ignored by the server for outgoing
	 * messages.
	 */
	me.chatMessage = function(room_name, username, message) {
		var uri = '/rooms/' + room_name + '/messages';
		var method = "Publish";

		return { Resource: { method: method, path: uri, payload: message } };
	};

	return me;
}());

