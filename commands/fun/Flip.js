module.exports = {
  name: "flip",
  aliases: [ 'coinflip', 'coin', 'tosscoin', 'tc' ],
  description: "Toss A Coin And Bet Heads Or Tails",
  usage: "<Head/Tails>",
  run: async(client, message, args) => {
    
    let choice = args[0];
    if (!choice || !['head', 'tail'].some(x => choice.toLowerCase() === x)){
      return client.embeds.error(message, "[HEAD] or [TAIL]");
    };

    let result;
    const won = !!Math.round(Math.random());
    const results = [ 'head', 'tail' ];
    results.splice(results.indexOf(choice), 1);

    if (won){
      result = choice;
    } else {
      [ result ] = results;
    };
    
    return client.embeds.normal(message, "Coin Toss", [
      `${message.author.tag} Tossed A Coin!`,
      `Bet: ${choice}`,
      `Result: ${result} ${won ? '✅' : '❌'}`
    ].join('\n'))
  }
}