"use strict"

module.exports = function(sequelize, DataTypes){
	var Preference = sequelize.define(
		"preference",
		{
			misteryAndSuspicion: {
		        type: DataTypes.INTEGER,
		        defaultValue: 0
		    },
	      	beautifulLanguage: {
	        	type: DataTypes.INTEGER,
	        	defaultValue: 0
	      	},
	      	complexRelathionships: {
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
			classMethods: {
				asssociate: function(models){
					Preference.belongsTo(models.User);
				}
			}
		}
	);

	return Preference;
}