import React from 'react';

const Error = ({ message }) => (
	<div>
		<div className="alert alert-danger" role="alert">
		<span>{message}</span>
	</div>
</div>
);

export default Error;