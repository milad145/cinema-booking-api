import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cinema Booking System API',
            version: '1.0.0',
            description: 'API for managing cinema rooms, movies, screenings and bookings',
            contact: {
                name: 'API Support',
                email: 'support@cinema.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011'
                        },
                        username: {
                            type: 'string',
                            example: 'john_doe'
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'admin'],
                            example: 'user'
                        }
                    }
                },
                Movie: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011'
                        },
                        name: {
                            type: 'string',
                            example: 'Inception'
                        },
                        poster: {
                            type: 'string',
                            example: 'http://example.com/poster.jpg'
                        },
                        duration: {
                            type: 'number',
                            example: 148
                        },
                        description: {
                            type: 'string',
                            example: 'A thief who steals corporate secrets...'
                        }
                    }
                },
                Room: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011'
                        },
                        name: {
                            type: 'string',
                            example: 'Red Room'
                        },
                        rows: {
                            type: 'number',
                            example: 10
                        },
                        seatsPerRow: {
                            type: 'number',
                            example: 8
                        },
                        seats: {
                            type: 'array',
                            items: {
                                type: 'string',
                                example: 'A1'
                            }
                        }
                    }
                },
                Screening: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011'
                        },
                        movie: {
                            $ref: '#/components/schemas/Movie'
                        },
                        room: {
                            $ref: '#/components/schemas/Room'
                        },
                        startTime: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-12-15T18:00:00Z'
                        },
                        endTime: {
                            type: 'string',
                            format: 'date-time',
                            example: '2023-12-15T20:28:00Z'
                        }
                    }
                },
                Booking: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011'
                        },
                        screening: {
                            $ref: '#/components/schemas/Screening'
                        },
                        seat: {
                            type: 'string',
                            example: 'A12'
                        },
                        user: {
                            $ref: '#/components/schemas/User'
                        },
                        status: {
                            type: 'string',
                            enum: ['pending', 'confirmed', 'cancelled'],
                            example: 'confirmed'
                        }
                    }
                }
            }
        }
    },
    apis: ['./libs/routes/index.yaml'] // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
    // Swagger page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};
