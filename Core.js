
const Discord = require('discord.js');
const bot = new Discord.Client();
const superagent = require('superagent');
const fs = require('fs');
bot.commands = new Discord.Collection();
let TheToken = process.env.BotToken
bot.login(TheToken);

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("음 인식이 안됨;;");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    let filenames = f.split(".");
    let filename = filenames[0];
    console.log(`${f} 로딩됨!`);
	bot.commands.set(props.help.name, props);
  });

});


bot.on("message", async message => {
	        let prefix = '.';
		let msgAr = message.content.split(" ");
		let msgc = message.content.slice(prefix.length);
		let i = msgAr[0];
		let pars = msgAr.slice(1);
		let verify = i.slice(prefix.length);
		let cmdFile = bot.commands.get(verify);

	

	
	if (!message.content.startsWith(prefix)) { return; } // Don't log Messages Without Prefix
		console.log(`${message.author.username.toString()} (${message.author.id.toString()})> ${message.content.toString()}`); // input Logging
	
	
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
	
	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot,message,args);
	



	
});
