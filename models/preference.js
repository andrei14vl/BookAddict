"use strict"

module.exports = function(sequelize, DataTypes){
	var Preference = sequelize.define(
		"Preference",
		{
			misteryAndSuspicion: {
		        type: DataTypes.INTEGER,
		        defaultValue: 5
		    },
	      	beautifulLanguage: {
	        	type: DataTypes.INTEGER,
	        	defaultValue: 5
	      	},
	      	complexRelathionships: {
	        	type: DataTypes.INTEGER,
	        	defaultValue: 5
	      	},
	      	intriguingCharacters: {
	        	type: DataTypes.INTEGER,
	        	defaultValue: 5
	      	},
	      	immersiveStorylines: {
	        	type: DataTypes.INTEGER,
	        	defaultValue: 5
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