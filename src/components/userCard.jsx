const FeedCards = ({user}) => {
    const {firstName, lastName, photoUrl,about,age,gender, skills} = user
    
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img
            src={photoUrl}
            alt="userPhoto"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName} {lastName}</h2>
          {age && gender && <p>{age+" "+gender}</p>}
          <p>{skills}</p>
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary mx-1">Ignore</button>
            <button className="btn btn-secondary mx-1">Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCards;
