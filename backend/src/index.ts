import app from './app';
import './database/connector';

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));