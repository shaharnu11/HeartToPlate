class Group {
  constructor(name, city, elderIds, volunteersIds, id, joinDate, maxElders, maxVolunteers) {
    this.elderIds = elderIds;
    this.volunteersIds = volunteersIds;
    this.city = city;
    this.id = id;
    this.joinDate = joinDate;
    this.maxElders = maxElders;
    this.maxVolunteers = maxVolunteers;
    this.name = name;
  }

  //   toString() {
  //     return `${this.name}, ${this.state}, ${this.country}`;
  //   }
}

const groupStatuses = ['Active', 'Pending'];
const volunteerStatuses = ['Active', 'Pending'];

// Firestore data converter
const groupConverter = {
  toFirestore(group) {
    return {
      elderIds: group.elderIds,
      volunteersIds: group.volunteersIds,
      city: group.city,
      id: group.id,
      joinDate: group.joinDate,
      maxElders: group.maxElders,
      maxVolunteers: group.maxVolunteers,
      name: group.name,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Group(
      data.name,
      data.city,
      data.elderIds,
      data.volunteersIds,
      data.id,
      data.joinDate,
      data.maxElders,
      data.maxVolunteers,
    );
  },
};

export { groupConverter, groupStatuses, volunteerStatuses };
