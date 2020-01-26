import React from 'react';

const Message = ({ message }) => (
	<div>
		<div className="alert alert-success" role="alert">
		<span>{message}</span>
		</div>
</div>
);

export default Message;