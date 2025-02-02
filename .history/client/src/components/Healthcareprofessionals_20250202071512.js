// HealthcareProfessional.js
// HealthcareProfessional.js


// HealthcareProfessionals.js
// HealthcareProfessionals.js
        </Button>

                <Collapse in={open[professional.id]}>
                  <ListGroup className="mt-3">
                    {professional.specializations && professional.specializations.length > 0 ? (
                      professional.specializations.map((specialization) => (
                        <ListGroup.Item key={specialization.id}>
                          {specialization.specialization_name} - {specialization.status}
                        </ListGroup.Item>
                      ))
                    ) : (
                      <ListGroup.Item>No Specializations</ListGroup.Item>
                    )}
                  </ListGroup>
                </Collapse>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default HealthcareProfessional;
