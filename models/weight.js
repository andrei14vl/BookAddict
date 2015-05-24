"use strict"

module.exports = function(sequelize, DataTypes){
	var Weight = sequelize.define(
		"weight",
		{
			misteryAndSuspicion: {
		        type: DataTypes.INTEGER,
		        defaultValue: 0
		    },
	      	beautifulLanguage: {
	        	type: DataTypes.INTEGER,
	        	defaultValue: 0
	      	},
	      	complexRelationships: {
	        	type: DataTypes.INTEGER,
	        	defaultValue: 0
	      	},
	      	intriguingCharacters: {
	        	type: DataTypes.INTEGER,
	        	defaultValue: 0
	      	},
	      	immersiveStorylines: {
	        	type: DataTypes.INTEGER,
	        	defaultValue: 0
	      	}
		},
		{
			classMethods:{
				associate: function(models){
					Weight.belongsTo(models.User);
				}
			}
		}
	);

	return Weight;
}